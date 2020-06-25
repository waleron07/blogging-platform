import React from 'react';
import { connect } from 'react-redux';
import { getIsAuth } from '../../redux/selectors';
import * as actions from '../../redux/actions';
import './Articles.css';

const Articles = () => <div className="articles">статьи</div>;

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

export default connect(mapStateToProps, actionCreators)(Articles);
