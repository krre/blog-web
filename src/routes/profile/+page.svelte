<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Page title={i18n.t('profile.title')}>
	<form method="POST">
		<label for="username">{i18n.t('profile.username')}:</label>
		<input type="text" name="username" readonly value={data.profile.username} />
		<label for="first_name">{i18n.t('profile.firstName')}:</label>
		<input type="text" name="first_name" required value={data.profile.first_name} />
		<label for="last_name">{i18n.t('profile.lastName')}:</label>
		<input type="text" name="last_name" value={data.profile.last_name} />
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
