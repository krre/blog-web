<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import type { PageProps } from './$types';
	import { i18n } from '$lib/i18n.svelte.js';

	let { form }: PageProps = $props();
</script>

<Page title={i18n.t('login.title')}>
	<form method="POST">
		<label for="username">{i18n.t('login.username')}: </label>
		<input type="text" name="username" required />
		<label for="password">{i18n.t('login.password')}: </label>
		<input type="password" name="password" />
		{#if form?.error}<div class="error">{form.error}</div>{/if}
		<button>{i18n.t('login.button')}</button>
	</form>
</Page>

<style>
	form {
		display: grid;
		gap: 0.5em;
		max-width: 300px;
		margin: 100px auto;
	}

	form button {
		justify-self: end;
	}

	.error {
		color: red;
	}
</style>
