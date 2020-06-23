import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Route, NavLink, Switch } from 'react-router-dom';
import { getLogin } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import { clearLocalstoge } from '../../utils';

const mapStateToProps = (state) => {
  const props = {
    isLogin: getLogin(state),
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
      <NavLink to="/blogging-platform/login">Войти</NavLink>
    </Button>
  );
  const Signup = () => (
    <Button className="header__btn" onClick={handleClickExit}>
      <NavLink to="/blogging-platform/signup">Регистрация</NavLink>
    </Button>
  );

  const Exit = () => (
    <Button className="header__btn" onClick={handleClickExit}>
      <NavLink to="/blogging-platform/signup">Выход</NavLink>
    </Button>
  );

  return (
    <div className="header">
      <Switch>
        <Route path="/blogging-platform/signup" component={Login} />
        <Route path="/blogging-platform/login" component={Signup} />
        <Route path="/blogging-platform/home" component={Exit} />
      </Switch>
    </div>
  );
};

Header.propTypes = {
  setLoginExit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Header);
