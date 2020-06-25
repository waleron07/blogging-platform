import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import './form-registration.css';
import { makeStyles } from '@material-ui/core/styles';
import { getBlockingForm } from '../../redux/selectors';
import validationSchema from './vadalition';
import * as actions from '../../redux/actions';
import { getLogin } from '../../utils/route';

const useStyles = makeStyles((theme) => ({
  wrapper__registration: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },

  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: 0,
    marginTop: theme.spacing(1),
    '@media(maxWidth: 1200px)': {
      fontSize: 18,
    },
  },

  registration: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    padding: theme.spacing(2),
    width: 350,
  },

  registration__data: {
    marginBottom: theme.spacing(2),
  },

  error__internet: {
    textAlign: 'center',
    color: 'red',
  },
}));

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
    <div className={classes.wrapper__registration}>
      <h1 className={classes.title}>регистрация</h1>
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
          <Form className={classes.registration} onSubmit={handleSubmit}>
            <Field
              size="small"
              name="username"
              className={classes.registration__data}
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
              className={classes.registration__data}
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
              className={classes.registration__data}
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
