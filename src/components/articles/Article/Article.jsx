import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import { getIsAuth } from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import formatDate from '../../../utils/formatDate';
import './Article.css';

const Article = ({
  article, unfavoriteArticle, favoriteArticle, isAuth,
}) => {
  const { favorited, slug } = article;
  const handleClikLikBtn = () => {
    if (favorited) {
      unfavoriteArticle(slug);
    } else {
      favoriteArticle(slug);
    }
  };

  const returnAddLike = () => (
    <div className="info__container">
      <Tooltip title="убрать лайк">
        <Favorite
          color="secondary"
          onClick={handleClikLikBtn}
          className="info__like"
        />
      </Tooltip>
      <span>{article.favoritesCount}</span>
    </div>
  );

  const returnNotLike = () => (
    <div className="info__container">
      <Tooltip title="авторизуйтесь пожалуйста">
        {article.favoritesCount > 0 ? (
          <Favorite color="secondary" className="info__like" />
        ) : (
          <FavoriteBorder color="secondary" className="info__like" />
        )}
      </Tooltip>
      <span>{article.favoritesCount}</span>
    </div>
  );

  const returnDeletetLike = () => (
    <div className="info__container">
      <Tooltip title="поставить лайк">
        <FavoriteBorder
          color="secondary"
          onClick={handleClikLikBtn}
          className="info__like"
        />
      </Tooltip>
      <span>{article.favoritesCount}</span>
    </div>
  );

  const Lick = () => {
    if (!isAuth) {
      return returnNotLike();
    }
    return article.favorited ? returnAddLike() : returnDeletetLike();
  };

  return (
    <div className="article__list">
      <div className="article__wraper">
        <span className="article__title">{article.title}</span>
        <span className="article__author">
          автор:
          <span className="article__author__name">
            {article.author.username}
          </span>
          <img
            className="image__user"
            alt="картинка пользователя"
            src={article.author.image}
          />
        </span>
      </div>
      {article.tagList && (
        <div className="article__tagList">
          {article.tagList.map((item) => (
            <span key={item} className="article__tagList__item">
              {item}
            </span>
          ))}
        </div>
      )}
      <span className="article__generated">
        создано:
        <span className="article__generated__time">
          {`${formatDate(article.createdAt)} назад`}
        </span>
      </span>
      {article.updatedAt === article.createdAt ? (
        ''
      ) : (
        <span className="article__generated">
          изменено:
          <span className="article__generated__time">
            {`${formatDate(article.updatedAt)} назад`}
          </span>
        </span>
      )}
      <Lick />
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    isAuth: getIsAuth(state),
  };
  return props;
};

const actionCreators = {
  favoriteArticle: actions.favoriteArticle,
  unfavoriteArticle: actions.unfavoriteArticle,
};

Article.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  article: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  unfavoriteArticle: PropTypes.func.isRequired,
  favoriteArticle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Article);
