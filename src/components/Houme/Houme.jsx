import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { getLoginData } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import './Houme.css';
import { clearLocalstoge } from '../../helpers-localstorege';

const mapStateToProps = (state) => {
  const props = {
    loginData: getLoginData(state),
  };
  return props;
};

const actionCreators = {
  setLoginFailure: actions.setLoginFailure,
};

const Houme = ({ loginData: { username }, setLoginFailure }) => {
  const handleClick = () => {
    setLoginFailure();
    clearLocalstoge();
  };

  return (
    <div className="wrapper__houme">
      <h1 className="title">Личный кабинет</h1>
      <span className="name">{username}</span>
      <Button className="houme__btn" onClick={handleClick}>
        <NavLink to="/blogging-platform/login">Выход</NavLink>
      </Button>
    </div>
  );
};

Houme.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  loginData: PropTypes.object.isRequired,
  setLoginFailure: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Houme);
