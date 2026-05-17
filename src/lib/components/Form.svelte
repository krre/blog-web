<script lang="ts">
	interface Props {
		buttonText: string;
		children: import('svelte').Snippet;
	}

	let { buttonText, children }: Props = $props();
</script>

<form method="POST">
	{@render children()}
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
</style>
