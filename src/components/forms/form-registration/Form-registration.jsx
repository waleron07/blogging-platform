import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { getBlockingForm } from '../../../redux/selectors';
import validationSchema from './vadalition';
import * as actions from '../../../redux/actions';
import useStyles from '../styled';
import { getLogin } from '../../../utils/route';

const actionCreators = {
  registration: actions.registration,
};

const FormRegistration = ({ registration, isBlockingForm }) => {
  const classes = useStyles();
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const handleSubmitRegistration = async (values, { setFieldError }) => {
    try {
      await registration(values, setFieldError);
    } catch (error) {
      if (error.response === undefined && error.isAxiosError) {
        setFieldError('errorName', 'Нет подключения к интернету');
      }
      if (error.response.data.errors.username) {
        setFieldError(
          'username',
          'Пользователь с таким именем уже зарегистрирован',
        );
      }
      if (error.response.data.errors.email) {
        setFieldError(
          'email',
          'Пользователь с такой почтой уже зарегистрирован',
        );
      }
    }
  };

  return (
    <div className={classes.form__container}>
      <h1 className={classes.form__title}>регистрация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitRegistration}
      >
        {({
          touched,
          errors,
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          dirty,
          isValid,
        }) => (
          <Form className={classes.form__user} onSubmit={handleSubmit}>
            <Field
              size="small"
              name="username"
              className={classes.form__user__data}
              as="input"
              component={TextField}
              label="Имя"
              variant="outlined"
              onChange={handleChange('username')}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              onBlur={handleBlur('username')}
              required
              value={values.username}
              disabled={isBlockingForm}
            />
            <Field
              size="small"
              name="email"
              className={classes.form__user__data}
              as="input"
              component={TextField}
              label="Электронная почта"
              variant="outlined"
              onChange={handleChange('email')}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              onBlur={handleBlur('email')}
              required
              value={values.email}
              disabled={isBlockingForm}
            />
            <Field
              size="small"
              name="password"
              className={classes.form__user__data}
              component={TextField}
              label="Пароль"
              variant="outlined"
              onChange={handleChange('password')}
              type="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              onBlur={handleBlur('password')}
              autoComplete="current-password"
              fullWidth
              required
              value={values.password}
              disabled={isBlockingForm}
            />
            <Button
              htmlType="submit"
              type="primary"
              disabled={!isValid || !dirty || isBlockingForm}
            >
              Зарегистрироваться
            </Button>
            {errors.errorName && (
              <span className={classes.error__internet}>
                {errors.errorName}
              </span>
            )}
          </Form>
        )}
      </Formik>
      <NavLink to={getLogin()}>Войти</NavLink>
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    isBlockingForm: getBlockingForm(state),
  };
  return props;
};

FormRegistration.propTypes = {
  registration: PropTypes.func.isRequired,
  isBlockingForm: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actionCreators)(FormRegistration);
