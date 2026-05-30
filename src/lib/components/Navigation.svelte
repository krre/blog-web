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
	<ul>
		{#each menuItems as item}
			{#if item.visible}
				<li>
					<a
						href={item.href}
						class:active={item.href === '/'
							? page.url.pathname === '/'
							: page.url.pathname.startsWith(item.href)}
					>
						{item.label}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

<style>
	nav ul {
		display: flex;
		font-size: 1rem;
		list-style: none;
		gap: 0.875rem;
		padding: 0;
	}

	nav a {
		text-decoration: none;
		color: var(--text-color-90);

		position: relative;
		padding-bottom: 5px;
		transition: color 0.3s ease;
	}

	nav a:hover {
		color: var(--text-color-500);
	}

	nav a.active::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background-color: var(--accent-color);
	}
</style>
