<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<form method="POST" use:enhance>
	<label for="username">Пользователь: </label>
	<input type="text" name="username" required />
	<label for="password">Пароль: </label>
	<input type="password" name="password" />
	{#if form?.error}<div class="error">{form.error}</div>{/if}
	<button>Войти</button>
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

	.error {
		color: red;
	}
</style>
