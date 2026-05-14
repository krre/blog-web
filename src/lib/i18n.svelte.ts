const defaultLang = 'ru';

const translations = {
	ru: {
		main: {
			title: 'Блог Владимира Зарыпова',
			underConstruction: 'В процессе разработки'
		},
		nav: {
			blog: 'Блог',
			append: 'Добавить',
			profile: 'Профиль',
			about: 'Об авторе',
			logout: 'Выйти'
		},
		login: {
			title: 'Войти',
			username: 'Пользователь',
			password: 'Пароль',
			button: 'Войти',
			wrongLoginOrPassword: 'Логин или пароль неверны'
		},
		append: {
			title: 'Добавить'
		},
		profile: {
			title: 'Профиль'
		},
		error: (status: number) => `${status}. Внутренная ошибка сервера`
	},
	en: {
		main: {
			title: `Vladimir Zarypov's blog`,
			underConstruction: 'Under construction'
		},
		nav: {
			blog: 'Blog',
			append: 'Append',
			profile: 'Profile',
			about: 'About',
			logout: 'Logout'
		},
		login: {
			title: 'Log In',
			username: 'Username',
			password: 'Password',
			button: 'Log in',
			wrongLoginOrPassword: 'Wrong login or password'
		},
		append: {
			title: 'Append'
		},
		profile: {
			title: 'Profile'
		},
		error: (status: number) => `${status}. Internal server error`
	}
};

type Locale = keyof typeof translations;

type LeaveKeys<T, K extends keyof T> = K extends string
	? T[K] extends object
		? `${K}.${LeaveKeys<T[K], keyof T[K]>}`
		: K
	: never;

type TranslationPaths = LeaveKeys<
	(typeof translations)[typeof defaultLang],
	keyof (typeof translations)[typeof defaultLang]
>;

class I18nManager {
	private locale = $state<Locale>(defaultLang);

	get getLocale(): Locale {
		return this.locale;
	}

	setLocale(locale: Locale): void {
		this.locale = locale;
		// TODO: Save to localStorage
	}

	t = $derived.by(() => {
		return (path: TranslationPaths, ...args: any[]): string => {
			const keys = path.split('.');
			let current: any = translations[this.locale];

			for (const key of keys) {
				if (current[key] === undefined) return path;
				current = current[key];
			}

			if (typeof current === 'function') {
				return current(...args);
			}

			return String(current);
		};
	});
}

export const i18n = new I18nManager();
