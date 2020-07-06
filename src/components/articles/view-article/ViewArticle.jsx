/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { uniqueId } from 'lodash';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import {
  getArticleOne,
  getUsername,
  getIsAuth,
} from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import formatDate from '../../../utils/formatDate';
import './ViewArticle.css';

const ViewArticle = ({ articleOne, username, isAuth }) => {
  const { article } = articleOne;
  const returnLike = () => (
    <li className="view__data">
      <Tooltip title="убрать лайк">
        <Favorite
          color="secondary"
          onClick={() => console.log('клик прошел')}
        />
      </Tooltip>
      <span>{article.favoritesCount}</span>
    </li>
  );

  const returnNotLike = () => (
    <li className="view__data">
      <Tooltip title="поставить лайк">
        <FavoriteBorder
          color="secondary"
          onClick={() => console.log('клик прошел')}
        />
      </Tooltip>
      <span>{article.favoritesCount}</span>
    </li>
  );

  console.log(article);
  return (
    <div className="container__view">
      {isAuth && username === article.author.username ? (
        <div className="view__wrapper__btn">
          <Button className="view__btn">редактировать</Button>
          <Button className="view__btn">удалить</Button>
        </div>
      ) : (
        ''
      )}
      <div className="container__wrapper__view">
        <ul className="view__list">
          <li className="view__data">
            <span className="data__description">заголовок: </span>
            {article.title}
          </li>
          <li className="view__data">
            <span className="data__description">автор: </span>
            {article.author.username}
          </li>
          <li className="view__data">
            <span className="data__description">краткое описание: </span>
            {article.description}
          </li>
          <li className="view__data">
            <span className="data__description">статья: </span>
            {article.body}
          </li>
          <li className="view__data">
            <span className="data__description">дата создания статьи: </span>
            {formatDate(article.createdAt)}
          </li>
          {article.updatedAt === article.createdAt ? (
            ''
          ) : (
            <li className="view__data">
              <span className="data__description">дата изменения статьи: </span>
              {formatDate(article.updatedAt)}
            </li>
          )}
          {article.tagList.map((tag) => (
            <li key={uniqueId()} className="view__data">
              {tag}
            </li>
          ))}
          {article.favorited ? returnLike() : returnNotLike()}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    articleOne: getArticleOne(state),
    username: getUsername(state),
    isAuth: getIsAuth(state),
  };
  return props;
};

const actionCreators = {
  getArticle: actions.getArticle,
};

ViewArticle.propTypes = {
  articleOne: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  username: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actionCreators)(ViewArticle);
