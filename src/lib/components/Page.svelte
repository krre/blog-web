<script lang="ts">
	interface Props {
		title: string;
		children: import('svelte').Snippet;
	}

	let { title, children }: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{@render children()}
