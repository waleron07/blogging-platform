import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { getUsername } from '../../redux/selectors';
import * as actionsArticles from '../../redux/actions/actionsArticles';
import * as actionsAuthentication from '../../redux/actions/actionsAuthentication';
import './Home.css';
import { clearLocalstoge } from '../../utils/localStorage';
import { getAdd, getLogin, getBlogging } from '../../utils/route';

const Houme = ({
  username, setLoginExit, getArticles, userArticles,
}) => {
  const handleClickExit = () => {
    setLoginExit();
    clearLocalstoge();
  };

  const handleClickAllArticles = () => {
    getArticles();
  };

  const handleClickUserArticles = () => {
    userArticles(username);
  };

  return (
    <div className="wrapper__houme">
      <h1 className="title">Личный кабинет</h1>
      <span className="name">{username}</span>
      <div className="houme__block__btn">
        <Button
          className="houme__btn__articles"
          onClick={handleClickAllArticles}
        >
          <NavLink className="btn__text" to={getBlogging()}>
            Показать все статьи
          </NavLink>
        </Button>
        <Button
          className="houme__btn__articles"
          onClick={handleClickUserArticles}
        >
          <NavLink className="btn__text" to={getBlogging()}>
            Показать мои статьи
          </NavLink>
        </Button>
        <Button className="houme__btn__articles">
          <NavLink className="btn__text" to={getAdd()}>
            Добавить статью
          </NavLink>
        </Button>
      </div>
      <Button className="houme__btn__exit" onClick={handleClickExit}>
        <NavLink to={getLogin()}>Выход</NavLink>
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    username: getUsername(state),
  };
  return props;
};

const actionCreators = {
  setLoginExit: actionsAuthentication.setLoginExit,
  getArticles: actionsArticles.getArticles,
  userArticles: actionsArticles.userArticles,
};

Houme.propTypes = {
  username: PropTypes.string.isRequired,
  setLoginExit: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired,
  userArticles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Houme);
