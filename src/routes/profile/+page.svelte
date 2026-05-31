<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import Form from '$lib/components/Form.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<Page title={i18n.t('profile.title')}>
	<div>
		<Rectangle>
			<Form
				action="?/update"
				buttonText={i18n.t('profile.updateButton')}
				success={form?.profileSuccess}
			>
				<label for="username">{i18n.t('profile.username')}:</label>
				<input type="text" id="username" name="username" readonly value={data.profile.username} />
				<label for="first-name">{i18n.t('profile.firstName')}:</label>
				<input
					type="text"
					id="first-name"
					name="first_name"
					required
					value={data.profile.first_name}
				/>
				<label for="last-name">{i18n.t('profile.lastName')}:</label>
				<input type="text" id="last-name" name="last_name" value={data.profile.last_name} />
				<label for="email">E-mail:</label>
				<input type="email" id="email" name="email" value={data.profile.email} />
				<label for="location">{i18n.t('profile.location')}:</label>
				<input type="text" id="location" name="location" value={data.profile.location} />
				<label for="bio">{i18n.t('profile.bio')}:</label>
				<input type="text" id="bio" name="bio" value={data.profile.bio} />
			</Form>
		</Rectangle>

		<Rectangle>
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
		</Rectangle>
	</div>
</Page>
