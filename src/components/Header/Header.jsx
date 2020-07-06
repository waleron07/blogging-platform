import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Route, NavLink, Switch } from 'react-router-dom';
import { getIsAuth } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import { clearLocalstoge } from '../../utils/localStorage';
import { getBlogging, getLogin, getSignup } from '../../utils/route';

const mapStateToProps = (state) => {
  const props = {
    isAuth: getIsAuth(state),
  };
  return props;
};

const actionCreators = {
  setLoginExit: actions.setLoginExit,
};

const Header = ({ setLoginExit }) => {
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
      <Button className="header__btn">
        <NavLink to={getBlogging()}>Личный кабинет</NavLink>
      </Button>
    </>
  );

  return (
    <div className="header">
      <Switch>
        <Route path={getSignup()} component={Login} />
        <Route path={getLogin()} component={Signup} />
        <Route path={getBlogging()} component={Exit} />
      </Switch>
    </div>
  );
};

Header.propTypes = {
  setLoginExit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Header);
