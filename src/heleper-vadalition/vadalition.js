import * as Yup from 'yup';

export const validationSchemaRegistration = Yup.object().shape({
  username: Yup.string()
    .max(50, 'Что-то слишком длинное имя')
    .min(2, 'Слишком короткое имя')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(8, 'Не менее 8 символов')
    .max(40, 'Ну может покороче пароль придумаете?')
    .required('Обязательное поле')
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])[a-z0-9A-Z]/,
      'буквы латинского алфавита и цифры, от 8 до 40 символов, как минимум одна цифра и одна заглавная буква',
    ),
  email: Yup.string()
    .email('Вводи правильно, адрес не коректен')
    .required('Обязательное поле'),
});

export const validationSchemaAutorisation = Yup.object().shape({
  email: Yup.string()
    .email('Вводи правильно, адрес не коректен')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(8, 'Не менее 8 символов')
    .max(40, 'Ну может покороче пароль придумаете?')
    .required('Обязательное поле')
    .matches(
      /(?=.*[0-9])(?=.*[A-Z])[a-z0-9A-Z]/,
      'буквы латинского алфавита и цифры, от 8 до 40 символов, как минимум одна цифра и одна заглавная буква',
    ),
});
