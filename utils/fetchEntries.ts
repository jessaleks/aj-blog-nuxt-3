
import { createClient } from 'contentful';
const config = useRuntimeConfig().public;

const client = createClient({
	space: config.spaceID,
	accessToken: config.accessToken,
});
/**
 * @description This function fetches all entries with a specified sys.id
 * @param {('blogPost'|'byteSizedThought' |'project')} contentTypeID
 * @param {String} accessToken
 * @returns {Array}
 */
export async function fetchEntries(
	contentTypeID: 'blogPost' | 'byteSizedThought' | 'project'
): Promise<Array<any>> {
	let entriesCollection;
	try {
		entriesCollection = await client.getEntries({
			content_type: contentTypeID,
			order: '-fields.publishedAt',
		});
	} catch (e) {
		console.log(e);
	}
	return entriesCollection;
}

/**
 * @description This function fetches an entry with a specified slug
 * @param {String} slug
 * @param {('blogPost'|'byteSizedThought')} contentTypeID
 * @returns {Object}
 */
export async function fetchAnEntry(slug, contentTypeID) {
	let entry;
	try {
		entry = await client.getEntries({
			content_type: contentTypeID,
			'fields.slug': slug,
		});
	} catch (e) {}
	return entry;
}
