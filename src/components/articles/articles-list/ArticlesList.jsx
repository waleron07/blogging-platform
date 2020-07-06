/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { getIsAuth, getArticlesList } from '../../../redux/selectors';
import * as actions from '../../../redux/actions';
import Article from '../Article';
import './ArticlesList.css';

const ArticlesList = ({ articlesList, getArticle }) => {
  const history = useHistory();
  const { articles } = articlesList;
  const hanleClckArticle = async (event, slug) => {
    getArticle(history, slug);
  };

  return (
    <div className="articles">
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
      <Pagination />
    </div>
  );
};

const mapStateToProps = (state) => {
  const props = {
    isAuth: getIsAuth(state),
    articlesList: getArticlesList(state),
  };
  return props;
};

const actionCreators = {
  getUser: actions.getUser,
  setLoginSuccess: actions.setLoginSuccess,
  getArticles: actions.getArticles,
  getArticle: actions.getArticle,
};

ArticlesList.propTypes = {
  articlesList: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
  getArticle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(ArticlesList);
