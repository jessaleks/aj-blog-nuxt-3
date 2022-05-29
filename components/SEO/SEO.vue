<template></template>

<script lang="ts" setup>
defineProps<{
	title: string;
	description: string;
	canonical: string;
	creator: string;
	twitterImage: string;
	ogImage: string;
	contentType: 'website' | 'article';
}>();

useHead({
	titleTemplate: computed((title) => `${title} | Aleksander Jess`).value,
	viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
	charset: 'utf-8',
	meta: [
		{ name: 'og:title', content: this.title },
		{ name: 'og:type', content: this.contentType },
	],
});
</script>
