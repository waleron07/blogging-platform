import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Обязательное поле'),
  email: Yup.string()
    .email('Вводи правильно, адрес не коректен')
    .required('Обязательное поле'),
});

export default validationSchema;
