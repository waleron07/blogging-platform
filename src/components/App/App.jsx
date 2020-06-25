/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header';
import { getIsAuth } from '../../redux/selectors';
import FormRegistration from '../form-registration';
import FormAutorization from '../form-autorisation';
import Articles from '../Articles';
import Home from '../Home';
import { getToken } from '../../utils/localStorage';
import {
  getBlogging, getHome, getLogin, getSignup,
} from '../../utils/route';
import * as actions from '../../redux/actions';

const App = ({ isAuth, getUser, setLoginSuccess }) => {
  const history = useHistory();

  const fetchPath = () => {
    const token = getToken();
    if (token) {
      getUser(history);
      setLoginSuccess();
    } else {
      history.push(getSignup());
    }
  };

  useEffect(() => {
    fetchPath();
  }, [isAuth]);

  return (
    <div className="container">
      <Route path={getBlogging()} component={Header} />
      <div className="wrapper_container">
        <div className="sitebar">
          <Route path={getHome()} component={Home} />
          <Route path={getLogin()} component={FormAutorization} />
          <Route path={getSignup()} component={FormRegistration} />
        </div>
        <Route path={getBlogging()} component={Articles} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    isAuth: getIsAuth(state),
  };
  return props;
};

const actionCreators = {
  getUser: actions.getUser,
  setLoginSuccess: actions.setLoginSuccess,
};

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  setLoginSuccess: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(App);
