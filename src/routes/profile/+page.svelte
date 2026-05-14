<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { PageProps } from '../$types';

	let { data }: PageProps = $props();
	console.log({ data });
</script>

<Page title={i18n.t('profile.title')}>
	<p></p>
</Page>
