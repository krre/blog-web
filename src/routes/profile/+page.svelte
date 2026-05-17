<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Form from '$lib/components/Form.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Page title={i18n.t('profile.title')}>
	<Form buttonText={i18n.t('profile.update')}>
		<label for="username">{i18n.t('profile.username')}:</label>
		<input type="text" name="username" readonly value={data.profile.username} />
		<label for="first_name">{i18n.t('profile.firstName')}:</label>
		<input type="text" name="first_name" required value={data.profile.first_name} />
		<label for="last_name">{i18n.t('profile.lastName')}:</label>
		<input type="text" name="last_name" value={data.profile.last_name} />
	</Form>
</Page>
