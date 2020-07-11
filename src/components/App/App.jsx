import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, useHistory, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header';
import { getIsAuth } from '../../redux/selectors';
import FormRegistration from '../forms/form-registration';
import FormAutorization from '../forms/form-autorisation';
import FormAddArticle from '../forms/form-add-article';
import FormEditArticle from '../forms/form-edit-article';
import ArticlesList from '../articles/articles-list';
import ViewArticle from '../articles/view-article';
import Home from '../Home';
import { getToken } from '../../utils/localStorage';
import {
  getBlogging,
  getLogin,
  getSignup,
  getAdd,
  getSlug,
  getEdit,
} from '../../utils/route';
import * as actions from '../../redux/actions';

const App = ({
  isAuth, getUser, setLoginSuccess, getArticles,
}) => {
  const history = useHistory();

  const fetchPath = () => {
    const token = getToken();
    if (token) {
      getUser(history);
      setLoginSuccess();
      getArticles();
    } else {
      history.push(getSignup());
      getArticles();
    }
  };

  useEffect(() => {
    fetchPath();
  }, [isAuth]);

  return (
    <div className="container">
      <Route path={getBlogging()} component={Header} />
      <div className="wrapper_container">
        <div className="sitebar">
          {isAuth && <Route path={getBlogging()} component={Home} />}
          <Route path={getLogin()} component={FormAutorization} />
          <Route path={getSignup()} component={FormRegistration} />
        </div>
        <Switch>
          <Route exact path={getSlug()} component={ViewArticle} />
          <Route path={getSignup()} component={ArticlesList} />
          <Route path={getLogin()} component={ArticlesList} />
          <Route exact path={getBlogging()} component={ArticlesList} />
        </Switch>
        <Route exact path={getAdd()} component={FormAddArticle} />
        <Route exact path={getEdit()} component={FormEditArticle} />
      </div>
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
  getUser: actions.getUser,
  setLoginSuccess: actions.setLoginSuccess,
  getArticles: actions.getArticles,
};

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  setLoginSuccess: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(App);
