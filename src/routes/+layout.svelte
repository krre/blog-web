<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import './layout.css';

	let { children } = $props();
	let isMenuOpen = $state(false);
</script>

<div class="app">
	<Header bind:isMenuOpen />
	<main>
		{@render children()}
	</main>

	<footer><p>© 2026 {i18n.t('main.author')}</p></footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		padding: 0 1rem;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		justify-content: center;
	}
</style>
