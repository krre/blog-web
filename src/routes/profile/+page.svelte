<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Page title={i18n.t('profile.title')}>
	<form method="POST">
		<label for="username">{i18n.t('profile.username')}:</label>
		<input type="text" readonly value={data.user.username} />
		<label for="first-name">{i18n.t('profile.firstName')}:</label>
		<input type="text" required value={data.user.first_name} />
		<label for="last-name">{i18n.t('profile.lastName')}:</label>
		<input type="text" value={data.user.last_name} />
		<button>{i18n.t('profile.update')}</button>
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
</style>
