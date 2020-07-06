/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import useStyles from '../styled';
import { getBlockingForm } from '../../../redux/selectors';
import validationSchema from './vadalition';
import * as actions from '../../../redux/actions';
import { getSignup } from '../../../utils/route';

const actionCreators = {
  authorization: actions.authorization,
};

const FormAutorization = ({ authorization, isBlockingForm }) => {
  const classes = useStyles();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmitAutorization = async (values, setFieldError) => {
    try {
      await authorization(values, setFieldError);
    } catch (error) {
      if (error.response === undefined && error.isAxiosError) {
        setFieldError('errorName', 'Нет подключения к интернету');
      } else {
        setFieldError('password', 'Почта или пароль неверны');
        setFieldError('email', 'Почта или пароль неверны');
      }
    }
  };

  return (
    <div className={classes.form__container}>
      <h1 className={classes.form__title}>Авторизация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError }) => {
          handleSubmitAutorization(values, setFieldError);
        }}
      >
        {({
          touched,
          errors,
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          isValid,
          dirty,
        }) => (
          <Form className={classes.form__user} onSubmit={handleSubmit}>
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
              Вход
            </Button>
            {errors.errorName && (
              <span className={classes.error__internet}>
                {errors.errorName}
              </span>
            )}
          </Form>
        )}
      </Formik>
      <NavLink to={getSignup()}>Зарегистрироваться</NavLink>
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    isBlockingForm: getBlockingForm(state),
  };
  return props;
};

FormAutorization.propTypes = {
  isBlockingForm: PropTypes.bool.isRequired,
  authorization: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(FormAutorization);
