<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import Rectangle from '$lib/components/Rectangle.svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import { fullUserName } from '$lib/utils';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Page title={i18n.t('about.title')}>
	<Rectangle>
		<div class="grid">
			<div>{i18n.t('about.name')}:</div>
			<div>{fullUserName(data.user.first_name, data.user.last_name)}</div>
			<div>E-mail:</div>
			<a href="mailto:{data.user.email}">{data.user.email}</a>
			<div>{i18n.t('profile.location')}:</div>
			<div>{data.user.location}</div>
			<div>{i18n.t('profile.bio')}:</div>
			<div>{data.user.bio}</div>
		</div>
	</Rectangle>
</Page>

<style>
	.grid {
		display: grid;
		gap: 0.5em;
		grid-template-columns: max-content auto;
	}
</style>
