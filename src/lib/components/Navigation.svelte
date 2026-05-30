<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { page } from '$app/state';

	const isAdmin = page.data.admin ? true : false;

	interface MenuItem {
		href: string;
		label: string;
		visible: boolean;
	}

	const menuItems: MenuItem[] = $derived([
		{ href: '/', label: i18n.t('nav.blog'), visible: true },
		{ href: '/post/append', label: i18n.t('nav.append'), visible: isAdmin },
		{ href: '/profile', label: i18n.t('nav.profile'), visible: isAdmin },
		{ href: '/about', label: i18n.t('nav.about'), visible: true },
		{ href: '/logout', label: i18n.t('nav.logout'), visible: isAdmin }
	]);
</script>

<nav>
	{#each menuItems as item}
		{#if item.visible}
			<a href={item.href}>
				{item.label}
			</a>
		{/if}
	{/each}
</nav>

<style>
	nav {
		font-size: 1rem;
	}

	a {
		padding: 0.3em;
		text-decoration: none;
		color: var(--text-color-900);
	}

	a:hover {
		color: var(--text-color-600);
		text-decoration: underline;
	}

	nav {
		display: flex;
	}
</style>
