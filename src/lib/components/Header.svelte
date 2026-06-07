<script lang="ts">
	import Menu from './menu/Menu.svelte';
	import BurgerButton from './menu/BurgerButton.svelte';

	let { isMenuOpen = $bindable(false) } = $props();
</script>

<header>
	<div class="burger-button">
		<BurgerButton bind:isOpen={isMenuOpen} />
	</div>
	<div class="menu">
		<Menu />
	</div>
</header>

<style>
	header {
		display: flex;
		align-items: center;
		height: 3rem;
		background-color: var(--secondary-color-50);
		margin-bottom: 1rem;
	}

	.burger-button {
		margin-left: 1rem;
	}

	.menu {
		margin-left: auto;
		margin-right: auto;
	}

	@media screen and (max-width: 45rem) {
		.burger-button {
			display: block;
		}

		.menu {
			display: none;
		}
	}

	@media screen and (min-width: 45rem) {
		.burger-button {
			display: none;
		}

		.menu {
			display: block;
		}
	}
</style>
