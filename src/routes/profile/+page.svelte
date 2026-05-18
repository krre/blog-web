<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Form from '$lib/components/Form.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<Page title={i18n.t('profile.title')}>
	<Form
		action="?/update"
		buttonText={i18n.t('profile.updateButton')}
		success={form?.profileSuccess}
	>
		<label for="username">{i18n.t('profile.username')}:</label>
		<input type="text" id="username" name="username" readonly value={data.profile.username} />
		<label for="first-name">{i18n.t('profile.firstName')}:</label>
		<input type="text" id="first-name" name="first_name" required value={data.profile.first_name} />
		<label for="last-name">{i18n.t('profile.lastName')}:</label>
		<input type="text" id="last-name" name="last_name" value={data.profile.last_name} />
	</Form>
	<Form
		action="?/changePassword"
		buttonText={i18n.t('profile.changeButton')}
		success={form?.passwordSuccess}
		error={form?.passwordError}
	>
		<label for="password">{i18n.t('profile.password')}:</label>
		<input type="password" id="password" name="password" required />
		<label for="confirm-password">{i18n.t('profile.confirmPassword')}:</label>
		<input type="password" id="confirm-password" name="confirm_password" required />
	</Form>
</Page>
