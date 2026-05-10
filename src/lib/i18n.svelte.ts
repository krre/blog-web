const translations = {
	ru: {
		username: 'Пользователь',
		password: 'Пароль',
		login: 'Войти',
		wrongLoginOrPassword: 'Логин или пароль неверны',
		error: (status: number) => `${status}. Внутренная ошибка сервера`
	},
	en: {
		username: 'Username',
		password: 'Password',
		login: 'Log in',
		wrongLoginOrPassword: 'Wrong login or password',
		error: (status: number) => `${status}. Internal server error`
	}
};

export type Locale = keyof typeof translations;
export type TranslationKeys = keyof (typeof translations)['ru'];

class I18nManager {
	private locale = $state<Locale>('ru');

	get getLocale(): Locale {
		return this.locale;
	}

	setLocale(locale: Locale): void {
		this.locale = locale;
		// TODO: Save to localStorage
	}

	t = $derived.by(() => {
		return (key: TranslationKeys, ...args: any[]): string => {
			const value = translations[this.locale][key];

			if (typeof value === 'function') {
				return (value as Function)(...args);
			}
			return value;
		};
	});
}

export const i18n = new I18nManager();
