import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { getLogin, getSignUp } from '../../redux/selectors';
import { validationSchemaRegistration } from '../../heleper-vadalition/vadalition';
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
}));

const actionCreators = {
  setRegistrations: actions.setRegistrations,
};

const FormRegistration = ({ setRegistrations, history }) => {
  const classes = useStyles();
  const initialValues = {
    username: 'waleron',
    email: 'sbsqwer@mail.ru',
    password: 'Qwerty123456',
  };

  return (
    <div className={classes.wrapper__registration}>
      <h1 className={classes.title}>регистрация</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaRegistration}
        onSubmit={(values, { setFieldError }) => {
          setRegistrations(values, setFieldError, history);
        }}
      >
        {({
          touched,
          errors,
          handleSubmit,
          handleBlur,
          handleChange,
          values,
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
            />
            <Button
              htmlType="submit"
              type="primary"
              disabled={Object.keys(errors).length > 0 ? 'disabled' : null}
            >
              Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>
      <NavLink to="/blogging-platform/login">Войти</NavLink>
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    isLogin: getLogin(state),
    isSignUp: getSignUp(state),
  };
  return props;
};

FormRegistration.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  setRegistrations: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(FormRegistration);
