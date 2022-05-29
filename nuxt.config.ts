import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	runtimeConfig: {
		spaceID: process.env.SPACE_ID,
		accessToken: process.env.ACCESS_TOKEN,
	},
});
