<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import type { PageProps } from '../$types';

	let { data }: PageProps = $props();
	console.log({ data });
</script>

<svelte:head>
	<title>{i18n.t('profile.title')}</title>
</svelte:head>
