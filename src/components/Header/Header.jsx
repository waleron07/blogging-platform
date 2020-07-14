import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Route, NavLink, Switch } from 'react-router-dom';
import { getIsAuth, getIsErrorInternet } from '../../redux/selectors';
import * as actionsAuthentication from '../../redux/actions/actionsAuthentication';
import { clearLocalstoge } from '../../utils/localStorage';
import { getBlogging, getLogin, getSignup } from '../../utils/route';

const Header = ({ setLoginExit, isErrorInternet }) => {
  const handleClickExit = () => {
    setLoginExit();
    clearLocalstoge();
  };

  const Login = () => (
    <Button className="header__btn" onClick={handleClickExit}>
      <NavLink to={getLogin()}>Войти</NavLink>
    </Button>
  );
  const Signup = () => (
    <Button className="header__btn" onClick={handleClickExit}>
      <NavLink to={getSignup()}>Регистрация</NavLink>
    </Button>
  );

  const Exit = () => (
    <>
      <Button className="header__btn" onClick={handleClickExit}>
        <NavLink to={getSignup()}>Выход</NavLink>
      </Button>
    </>
  );

  return (
    <div className="header">
      {isErrorInternet && (
        <span className="error__internet">Нет подключения к интернету</span>
      )}
      <Switch>
        <Route path={getSignup()} component={Login} />
        <Route path={getLogin()} component={Signup} />
        <Route path={getBlogging()} component={Exit} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    isAuth: getIsAuth(state),
    isErrorInternet: getIsErrorInternet(state),
  };
  return props;
};

const actionCreators = {
  setLoginExit: actionsAuthentication.setLoginExit,
};

Header.propTypes = {
  setLoginExit: PropTypes.func.isRequired,
  isErrorInternet: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Header);
