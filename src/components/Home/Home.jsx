import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { getUsername } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import './Home.css';
import { clearLocalstoge } from '../../utils';

const mapStateToProps = (state) => {
  const props = {
    username: getUsername(state),
  };
  return props;
};

const actionCreators = {
  setLoginExit: actions.setLoginExit,
};

const Houme = ({ username, setLoginExit }) => {
  const handleClick = () => {
    setLoginExit();
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
  username: PropTypes.string.isRequired,
  setLoginExit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Houme);
