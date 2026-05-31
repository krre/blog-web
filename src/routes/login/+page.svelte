<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import Form from '$lib/components/Form.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<Page title={i18n.t('login.title')}>
	<Rectangle>
		<div class="container">
			<Form buttonText={i18n.t('login.loginButton')} error={form?.error}>
				<label for="username">{i18n.t('login.username')}: </label>
				<input type="text" id="username" name="username" required value={form?.username ?? ''} />
				<label for="password">{i18n.t('login.password')}: </label>
				<input type="password" id="password" name="password" />
			</Form>
		</div>
	</Rectangle>
</Page>

<style>
	.container {
		margin: 5rem auto;
		display: flex;
		justify-content: center;
	}
</style>
