import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from '../Header';
import { getLogin, getSignUp, getLoginData } from '../../redux/selectors';
import FormRegistration from '../Form-registration';
import FormAutorization from '../Form-autorisation';
import Houme from '../Houme';
import * as actions from '../../redux/actions';

const App = ({
  isLogin, history, getAutorizations, setLoginSuccess,
}) => {
  const updatePath = () => {
    const token = localStorage.getItem('token');
    if (token) {
      getAutorizations(history);
      setLoginSuccess();
    } else {
      history.push('/blogging-platform/signup');
    }
  };

  useEffect(() => {
    updatePath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <>
      <div className="container">
        <Route path="/blogging-platform" component={Header} />
        <div className="sitebar">
          <Route path="/blogging-platform/houme" component={Houme} />
          <Route path="/blogging-platform/login" component={FormAutorization} />
          <Route
            path="/blogging-platform/signup"
            component={FormRegistration}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const props = {
    isLogin: getLogin(state),
    isSignUp: getSignUp(state),
    loginData: getLoginData(state),
  };
  return props;
};

const actionCreators = {
  getAutorizations: actions.getAutorizations,
  setLoginSuccess: actions.setLoginSuccess,
};

App.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  getAutorizations: PropTypes.func.isRequired,
  setLoginSuccess: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(App);
