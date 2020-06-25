/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import './form-autorization.css';
import { makeStyles } from '@material-ui/core/styles';
import { getBlockingForm } from '../../redux/selectors';
import validationSchema from './vadalition';
import * as actions from '../../redux/actions';
import { getSignup } from '../../utils/route';

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
    <div className={classes.wrapper__registration}>
      <h1 className={classes.title}>Авторизация</h1>
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
          <Form className={classes.registration} onSubmit={handleSubmit}>
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
