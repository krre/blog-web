<script lang="ts">
	interface Props {
		children: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="rect">
	{@render children?.()}
</div>

<style>
	.rect {
		margin: var(--page-margin);
		padding: var(--page-padding);
		background-color: var(--background-color);
		border: var(--border-1px);
	}
</style>
