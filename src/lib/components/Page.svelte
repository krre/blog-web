<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';

	interface Props {
		title?: string;
		children: import('svelte').Snippet;
	}

	let { title, children }: Props = $props();
</script>

<svelte:head>
	<title>{title ? `${title} - ${i18n.t('main.title')}` : i18n.t('main.title')}</title>
</svelte:head>

{@render children()}
