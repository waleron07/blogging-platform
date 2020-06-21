/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from '../Header';
import { getLogin } from '../../redux/selectors';
import FormRegistration from '../form-registration';
import FormAutorization from '../form-autorisation';
import Houme from '../Home';
import * as actions from '../../redux/actions';

const App = ({
  isLogin, history, getUser, setLoginSuccess,
}) => {
  const fetchPath = () => {
    const token = localStorage.getItem('token');
    if (token) {
      getUser(history);
      setLoginSuccess();
    } else {
      history.push('/blogging-platform/signup');
    }
  };

  useEffect(() => {
    fetchPath();
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
  };
  return props;
};

const actionCreators = {
  getUser: actions.getUser,
  setLoginSuccess: actions.setLoginSuccess,
};

App.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  history: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  getUser: PropTypes.func.isRequired,
  setLoginSuccess: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(App);
