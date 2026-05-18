<script lang="ts">
	interface Props {
		action?: string;
		success?: string;
		error?: string;
		buttonText: string;
		children: import('svelte').Snippet;
	}

	let { action, success, error, buttonText, children }: Props = $props();
</script>

<form method="POST" {action}>
	{@render children()}
	{#if success}<div class="success">{success}</div>{/if}
	{#if error}<div class="error">{error}</div>{/if}
	<button>{buttonText}</button>
</form>

<style>
	form {
		display: grid;
		gap: 0.5em;
		max-width: 300px;
		margin: 100px auto;
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
