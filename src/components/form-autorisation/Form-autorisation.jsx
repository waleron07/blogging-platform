/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { getLogin, getIsRequest } from '../../redux/selectors';
import validationSchema from './vadalition';
import * as actions from '../../redux/actions';

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

const FormAutorization = ({ authorization, isRequest }) => {
  const classes = useStyles();

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <div className={classes.wrapper__registration}>
      <h1 className={classes.title}>Авторизация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setFieldError }) => {
          authorization(values, setFieldError);
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
              disabled={isRequest}
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
              disabled={isRequest}
            />
            <Button
              htmlType="submit"
              type="primary"
              disabled={!isValid || !dirty || isRequest}
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
      <NavLink to="/blogging-platform/signup">Зарегистрироваться</NavLink>
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    isLogin: getLogin(state),
    isRequest: getIsRequest(state),
  };
  return props;
};

FormAutorization.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  isRequest: PropTypes.bool.isRequired,
  authorization: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(FormAutorization);
