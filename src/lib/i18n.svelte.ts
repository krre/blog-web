const defaultLang = 'ru';

const translations = {
	en: {
		nav: {
			blog: 'Blog',
			append: 'Append',
			drafts: 'Drafts',
			gallery: 'Gallery',
			profile: 'Profile',
			about: 'About',
			logout: 'Logout'
		},
		burger: {
			button: 'Open menu'
		},
		main: {
			title: `Vladimir Zarypov's blog`,
			author: 'Vladimir Zarypov'
		},
		login: {
			title: 'Log In',
			username: 'Username',
			password: 'Password',
			loginButton: 'Log in',
			wrongLoginOrPassword: 'Wrong login or password'
		},
		edit: {
			title: 'Edit'
		},
		editor: {
			title: 'Title',
			post: 'Post',
			sendButton: 'Send'
		},
		post: {
			date: {
				created: 'Created',
				updated: 'Updated',
				published: 'Published'
			},
			button: {
				publish: 'Publish',
				hide: 'Hide',
				edit: 'Edit',
				delete: 'Delete'
			},
			deleteDialog: 'Confirm to delete post'
		},
		gallery: {
			button: {
				append: 'Append',
				link: 'Link',
				delete: 'Delete'
			},
			deleteDialog: 'Confirm to delete image'
		},
		profile: {
			username: 'Username',
			firstName: 'First name',
			lastName: 'Last name',
			location: 'Location',
			bio: 'Bio',
			updateButton: 'Update',
			profileUpdated: 'Profile updated',
			password: 'Password',
			confirmPassword: 'Confirm password',
			changeButton: 'Change',
			differentPasswords: `Passwords don't match`,
			passwordUpdated: 'Password changed'
		},
		about: {
			name: 'Name'
		},
		error: (status: number) => `${status}. Internal server error`
	},
	ru: {
		nav: {
			blog: 'Блог',
			append: 'Добавить',
			drafts: 'Черновики',
			gallery: 'Галерея',
			profile: 'Профиль',
			about: 'Об авторе',
			logout: 'Выйти'
		},
		burger: {
			button: 'Открыть меню'
		},
		main: {
			title: 'Блог Владимира Зарыпова',
			author: 'Владимир Зарыпов'
		},
		login: {
			title: 'Войти',
			username: 'Пользователь',
			password: 'Пароль',
			loginButton: 'Войти',
			wrongLoginOrPassword: 'Логин или пароль неверны'
		},
		edit: {
			title: 'Редактировать'
		},
		editor: {
			title: 'Заголовок',
			post: 'Пост',
			sendButton: 'Отправить'
		},
		post: {
			date: {
				created: 'Создано',
				updated: 'Изменено',
				published: 'Опубликовано'
			},
			button: {
				publish: 'Опубликовать',
				hide: 'Спрятать',
				edit: 'Редактировать',
				delete: 'Удалить'
			},
			deleteDialog: 'Подтвердите удаление поста'
		},
		profile: {
			username: 'Пользователь',
			firstName: 'Имя',
			lastName: 'Фамилия',
			location: 'Откуда',
			bio: 'О себе',
			updateButton: 'Обновить',
			profileUpdated: 'Профиль обновлён',
			password: 'Пароль',
			confirmPassword: 'Пароль (ещё раз)',
			changeButton: 'Изменить',
			differentPasswords: `Пароли не совпадают`,
			passwordUpdated: 'Пароль изменён'
		},
		gallery: {
			button: {
				append: 'Добавить',
				link: 'Ссылка',
				delete: 'Удалить'
			},
			deleteDialog: 'Подтвердите удаление изображения'
		},
		about: {
			name: 'Имя'
		},
		error: (status: number) => `${status}. Внутренная ошибка сервера`
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
