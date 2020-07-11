import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import {
  getArticlesList,
  getUsername,
  getIsErrorInternet,
  getIsAuth,
} from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import Article from '../Article';
import './ArticlesList.css';

const ArticlesList = ({
  isAuth,
  articlesList,
  getArticle,
  getArticles,
  userArticles,
  username,
  isErrorInternet,
}) => {
  const history = useHistory();
  const { articles, articlesCount, userArticle } = articlesList;

  const hanleClckArticle = async (event, slug) => {
    if (!isAuth) {
      return;
    }

    if (
      event.target.parentElement.classList.contains('info__like')
      || event.target.parentElement.classList.contains('info__container')
    ) {
      return;
    }

    getArticle(slug, history);
  };

  const handleChangePagination = async (event, page) => {
    const countOffset = page * 10 - 10;
    return userArticle
      ? userArticles(username, countOffset)
      : getArticles(countOffset);
  };

  return (
    <div className="articles">
      {isErrorInternet && (
        <span className="error__internet">Нет подключения к интернету</span>
      )}
      {articles
        && articles.map((item) => {
          const { slug } = item;
          return (
            <div
              key={slug}
              className="article__container"
              onKeyDown={(event) => hanleClckArticle(event, slug)}
              tabIndex={0}
              onClick={(event) => hanleClckArticle(event, slug)}
              role="button"
            >
              <Article article={item} hanleClckArticle={hanleClckArticle} />
            </div>
          );
        })}
      <Pagination
        count={Math.ceil(articlesCount / 10)}
        onChange={handleChangePagination}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    isAuth: getIsAuth(state),
    articlesList: getArticlesList(state),
    username: getUsername(state),
    isErrorInternet: getIsErrorInternet(state),
  };
  return props;
};

const actionCreators = {
  getUser: actions.getUser,
  setLoginSuccess: actions.setLoginSuccess,
  getArticles: actions.getArticles,
  getArticle: actions.getArticle,
  userArticles: actions.userArticles,
};

ArticlesList.propTypes = {
  articlesList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  isAuth: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  getArticle: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired,
  userArticles: PropTypes.func.isRequired,
  isErrorInternet: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, actionCreators)(ArticlesList);
