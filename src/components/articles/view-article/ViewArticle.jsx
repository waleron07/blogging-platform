import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  getIsErrorInternet,
} from '../../../redux/selectors';
import * as actionsArticles from '../../../redux/actions/actionsArticles';
import formatDate from '../../../utils/formatDate';
import { getEdit } from '../../../utils/route';
import './ViewArticle.css';

const ViewArticle = ({
  articleOne,
  username,
  isAuth,
  favoriteArticle,
  unfavoriteArticle,
  deleteArticle,
  isErrorInternet,
}) => {
  const history = useHistory();
  const [statusDeleteArticle, setStatusDeleteArticle] = useState(null);
  const { article } = articleOne;
  const handleClickBtnLike = () => {
    const { favorited, slug } = article;
    return favorited ? unfavoriteArticle(slug) : favoriteArticle(slug);
  };

  const handleClickBtnDelete = async () => {
    await deleteArticle(article.slug);
    setStatusDeleteArticle(true);
  };

  const handleClickBtnEdit = () => {
    history.push(getEdit(article.slug));
  };

  const returnLike = () => (
    <li className="view__data">
      <Tooltip title="убрать лайк">
        <Favorite color="secondary" onClick={handleClickBtnLike} />
      </Tooltip>
      <span>{article.favoritesCount}</span>
    </li>
  );

  const returnNotLike = () => (
    <li className="view__data">
      <Tooltip title="поставить лайк">
        <FavoriteBorder color="secondary" onClick={handleClickBtnLike} />
      </Tooltip>
      <span>{article.favoritesCount}</span>
    </li>
  );

  const returnArticle = () => (
    <div className="container__view">
      {isErrorInternet && (
        <span className="error__internet">Нет подключения к интернету</span>
      )}
      {isAuth && username === article.author.username ? (
        <div className="view__wrapper__btn">
          <Button className="view__btn" onClick={handleClickBtnEdit}>
            редактировать
          </Button>
          <Button className="view__btn" onClick={handleClickBtnDelete}>
            удалить
          </Button>
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

  const returnStatusDelete = () => (
    <div>
      <span>Ваша статья успешно удалена</span>
    </div>
  );

  return statusDeleteArticle ? returnStatusDelete() : returnArticle();
};

const mapStateToProps = (state) => {
  const props = {
    articleOne: getArticleOne(state),
    username: getUsername(state),
    isAuth: getIsAuth(state),
    isErrorInternet: getIsErrorInternet(state),
  };
  return props;
};

const actionCreators = {
  favoriteArticle: actionsArticles.favoriteArticle,
  unfavoriteArticle: actionsArticles.unfavoriteArticle,
  deleteArticle: actionsArticles.deleteArticle,
};

ViewArticle.propTypes = {
  articleOne: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  username: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isErrorInternet: PropTypes.bool.isRequired,
  unfavoriteArticle: PropTypes.func.isRequired,
  favoriteArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(ViewArticle);
