<script>
	import { i18n } from '$lib/i18n.svelte';
	let { isOpen = $bindable(false) } = $props();

	function toggle() {
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}
</script>

<button
	class="burger"
	class:open={isOpen}
	onclick={toggle}
	aria-label={i18n.t('burger.button')}
	aria-expanded={isOpen}
>
	<span class="line"></span>
	<span class="line"></span>
	<span class="line"></span>
</button>

{#if isOpen}
	<div
		class="overlay"
		role="button"
		tabindex="0"
		onclick={close}
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				close();
			}
		}}
	></div>
{/if}

<style>
	.burger {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 30px;
		height: 25px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 10;
	}

	.line {
		width: 100%;
		height: 3px;
		background-color: var(--text-color);
		opacity: 0.7;
		border-radius: 10px;
		transition: all 0.3s ease-in-out;
	}

	.burger.open .line:nth-child(1) {
		transform: translateY(8px) rotate(45deg);
	}

	.burger.open .line:nth-child(2) {
		opacity: 0;
	}

	.burger.open .line:nth-child(3) {
		transform: translateY(-8px) rotate(-45deg);
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(2px);
		z-index: 8;
	}
</style>
