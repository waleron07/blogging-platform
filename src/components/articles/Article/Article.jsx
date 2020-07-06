import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../utils/formatDate';
import './Article.css';

const Article = ({ article }) => (
  <div className="article__list">
    <div className="article__wraper">
      <span className="article__title">{article.title}</span>
      <span className="article__author">
        автор:
        <span className="article__author__name">{article.author.username}</span>
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
  </div>
);

Article.propTypes = {
  article: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
};

export default Article;
