import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import autolinkHeadings from 'rehype-autolink-headings';
import toc, { HtmlElementNode } from '@jsdevtools/rehype-toc';
import { h } from 'hastscript';

export async function transformMarkdown(markdown) {
	try {
		return await unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeSanitize)
			.use(rehypeRaw)
			.use(rehypeSlug)
			.use(autolinkHeadings)
			.use(toc, {
				headings: ['h2', 'h3'],
				cssClasses: {
					toc: 'toc prose-ul:pl-0 pl-0 my-10 ml-0 lg:mb-22',
					list: 'pl-0',
				},
				customizeTOC: (tocNode) => {
					const tocElement = tocNode as HtmlElementNode;
					tocElement.tagName = 'ul';
					tocElement.children.unshift({
						type: 'element',
						//@ts-ignore
						tagName: 'script',
						properties: {
							type: 'application/ld+json',
							key: 'toc-title',
						},
						children: [
							{
								type: 'text',
								value: JSON.stringify({
									'@context': 'http://schema.org',
									'@type': 'Table',
									name: 'Table of Contents',
								}),
							},
						],
					});
					tocElement.children.unshift({
						type: 'element',
						// @ts-ignore
						tagName: 'h3',
						properties: {
							className: 'pl-0 font-bold w-full text-white',
							style: { paddingLeft: '0px' },
						},
						children: [
							{
								type: 'text',
								value: 'Table of Contents',
							},
						],
					});
					// @ts-ignore
					tocNode.children[2].tagName = 'ul';
					return tocNode;
				},
			})
			.use(rehypeStringify)
			.process(markdown);
	} catch (error) {
		throw new Error('Markdown parsing failed', error.message.toString());
	}
}

export async function transformMarkdownWithoutToC(content: string) {
	try {
		return await unified()
			.use(remarkParse)
			.use(remarkGfm)
			.use(remarkRehype, { allowDangerousHtml: true })
			.use(rehypeSanitize)
			.use(rehypeRaw)
			.use(rehypeSlug)
			.use(autolinkHeadings)

			.use(rehypeStringify)
			.process(content);
	} catch (error) {
		throw new Error('Markdown parsing failed', error.message.toString());
	}
}
