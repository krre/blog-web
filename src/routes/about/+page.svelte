<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import { fullUserName } from '$lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Page title={i18n.t('about.title')}>
	<div class="grid">
		<div class="label">{i18n.t('about.name')}:</div>
		<div>{fullUserName(data.user.first_name, data.user.last_name)}</div>
		<div class="label">E-mail:</div>
		<div>{data.user.email}</div>
		<div class="label">{i18n.t('profile.location')}:</div>
		<div>{data.user.location}</div>
		<div class="label">{i18n.t('profile.bio')}:</div>
		<div>{data.user.bio}</div>
	</div>
</Page>

<style>
	.grid {
		display: grid;
		gap: 0.5em;
		grid-template-columns: max-content auto;
	}

	.label {
		color: var(--primary-color-400);
	}
</style>
