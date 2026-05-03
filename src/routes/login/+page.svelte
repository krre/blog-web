<form method="POST">
	<label for="login">Логин: </label>
	<input type="text" name="login" required />
	<label for="password">Пароль: </label>
	<input type="password" name="password" required />
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
