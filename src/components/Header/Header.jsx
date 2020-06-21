import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
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

const Header = ({ setLoginExit, history, isLogin }) => {
  const handleClickExit = () => {
    setLoginExit();
    clearLocalstoge();
  };

  const returnAutorization = () => (
    <>
      <Button className="header__btn" onClick={handleClickExit}>
        <NavLink to="/blogging-platform/signup">Выход</NavLink>
      </Button>
    </>
  );

  const returnNotAutorization = () => {
    const { pathname } = history.location;
    const link = pathname === '/blogging-platform/signup'
      ? '/blogging-platform/login'
      : '/blogging-platform/signup';
    const buttonValue = pathname === '/blogging-platform/signup' ? 'Вход' : 'Регистрация';
    return (
      <>
        <Button className="header__btn">
          <NavLink to={link}>{buttonValue}</NavLink>
        </Button>
      </>
    );
  };

  return (
    <div className="header">
      {isLogin ? returnAutorization() : returnNotAutorization()}
    </div>
  );
};

Header.propTypes = {
  setLoginExit: PropTypes.func.isRequired,
  history: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  isLogin: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Header);
