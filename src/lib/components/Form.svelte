<script lang="ts">
	interface Props {
		width?: number;
		action?: string;
		success?: string;
		error?: string;
		buttonText: string;
		children: import('svelte').Snippet;
	}

	let { width, action, success, error, buttonText, children }: Props = $props();
</script>

<form method="POST" style="max-width: {width ?? 25}rem;" {action}>
	{@render children()}
	{#if success}<div class="success">{success}</div>{/if}
	{#if error}<div class="error">{error}</div>{/if}
	<button>{buttonText}</button>
</form>

<style>
	form {
		display: grid;
		gap: 0.5em;
	}

	form button {
		justify-self: end;
	}

	.success {
		color: green;
	}

	.error {
		color: red;
	}
</style>
