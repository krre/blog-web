<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Form from '$lib/components/Form.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<Page title={i18n.t('login.title')}>
	<Form buttonText={i18n.t('login.button')}>
		<label for="username">{i18n.t('login.username')}: </label>
		<input type="text" name="username" required />
		<label for="password">{i18n.t('login.password')}: </label>
		<input type="password" name="password" />
		{#if form?.error}<div class="error">{form.error}</div>{/if}
	</Form>
</Page>

<style>
	.error {
		color: red;
	}
</style>
