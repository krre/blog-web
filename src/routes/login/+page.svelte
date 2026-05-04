<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance>
	<label for="username">Пользователь: </label>
	<input type="text" name="username" required />
	<label for="password">Пароль: </label>
	<input type="password" name="password" />
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
</style>
