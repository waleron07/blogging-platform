import React from 'react';
import './Header.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { getLogin } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import { clearLocalstoge } from '../../helpers-localstorege';

const mapStateToProps = (state) => {
  const props = {
    isLogin: getLogin(state),
  };
  return props;
};

const actionCreators = {
  setLoginFailure: actions.setLoginFailure,
};

const Header = ({ isLogin, setLoginFailure, history }) => {
  const handleClickExit = () => {
    setLoginFailure();
    clearLocalstoge();
  };

  const mappincButton = {
    bloggingplatformlogin: 'Регистрация',
    bloggingplatformsignup: 'Вход',
  };
  const mappincLinc = {
    bloggingplatformlogin: '/blogging-platform/signup',
    bloggingplatformsignup: '/blogging-platform/login',
    bloggingplatform: '/blogging-platform/login',
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
    const newPathname = pathname.replace(/[/,-]/g, '');

    return (
      <>
        <Button className="header__btn">
          <NavLink to={mappincLinc[newPathname]}>
            {mappincButton[newPathname]}
          </NavLink>
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
  isLogin: PropTypes.bool.isRequired,
  setLoginFailure: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Header);
