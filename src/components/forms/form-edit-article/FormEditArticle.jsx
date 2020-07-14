import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field, FieldArray,
} from 'formik';
import { Button, Input } from 'antd';
import { uniqueId } from 'lodash';
import { TextField, TextareaAutosize } from '@material-ui/core';
import validationSchema from './validation';
import useStyles from '../styled';
import { getBlockingForm, getArticleOne } from '../../../redux/selectors';
import * as actionsArticles from '../../../redux/actions/actionsArticles';

const FormEditArticle = ({ isBlockingForm, articleOne, editArticle }) => {
  const [statusEditArticle, setStatusEditArticle] = useState(null);
  const { article } = articleOne;
  const classes = useStyles();

  const normalizeData = ({ tagList }) => {
    const newTagList = tagList.filter(({ tags }) => tags !== '');
    const arrTag = newTagList.reduce((acc, { tags }) => [...acc, tags], []);
    return Array.from(new Set(arrTag));
  };
  const formaTagList = () => {
    const res = article.tagList.reduce((acc, item) => {
      const id = uniqueId();
      const tags = item;
      acc.push({
        id,
        tags,
      });

      return acc;
    }, []);
    return res;
  };

  const initialValues = {
    title: article.title,
    description: article.description,
    body: article.body,
    tagList: formaTagList(),
  };

  const handleSubmitForm = async (values, { setFieldError }) => {
    const { title, description, body } = values;
    const arrTagList = normalizeData(values);
    const articles = {
      article: {
        title,
        description,
        body,
        tagList: arrTagList,
      },
    };

    try {
      await editArticle(articles, article.slug);
      setStatusEditArticle(true);
    } catch (error) {
      if (error.response === undefined && error.isAxiosError) {
        setFieldError('errorName', 'Нет подключения к интернету');
      }
    }
  };

  const returnForm = () => (
    <div className={classes.form__container__addArticle}>
      <h1 className={classes.form__title}>Редактировать статью</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          touched,
          errors,
          isValid,
          dirty,
        }) => (
          <Form className={classes.form__user} onSubmit={handleSubmit}>
            {touched.name && (
              <span className="error__message">{errors.name}</span>
            )}
            <Field
              size="small"
              name="title"
              as="input"
              component={TextField}
              className={classes.form__user__data}
              label="Загаловок статьи"
              variant="outlined"
              onChange={handleChange('title')}
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              onBlur={handleBlur('title')}
              required
              value={values.title}
              disabled={isBlockingForm}
            />
            <Field
              size="small"
              name="description"
              as="input"
              component={TextField}
              className={classes.form__user__data}
              label="Краткое описание"
              variant="outlined"
              onChange={handleChange('description')}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              onBlur={handleBlur('description')}
              required
              value={values.description}
              disabled={isBlockingForm}
            />
            <Field
              size="small"
              name="body"
              as="input"
              component={TextareaAutosize}
              className={classes.form__user__body}
              placeholder="Текст статьи"
              rows="10"
              variant="outlined"
              onChange={handleChange('body')}
              onBlur={handleBlur('body')}
              required
              value={values.body}
              disabled={isBlockingForm}
            />
            <span className={classes.error__internet}>
              {touched.body ? errors.body : ''}
            </span>
            <FieldArray
              name="tagList"
              render={(arrayHelpers) => (
                <div>
                  {values.tagList.map((tags, index) => (
                    <div key={tags.id}>
                      <div className={classes.form__block__tags}>
                        <Input
                          className={classes.form__user__tags}
                          name={`tagList.[${index}].tags`}
                          onChange={handleChange}
                          disabled={isBlockingForm}
                          value={tags.tags}
                        />
                        <Button
                          className={classes.form__user__btn__tags}
                          onClick={() => arrayHelpers.remove(index)}
                          disabled={isBlockingForm}
                        >
                          х
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    className={classes.form__user__btn}
                    disabled={isBlockingForm}
                    onClick={() => {
                      arrayHelpers.push({ id: uniqueId(), tags: '' });
                    }}
                  >
                    Добавить тэг
                  </Button>
                </div>
              )}
            />
            {errors.errorName && (
              <span className={classes.error__internet}>
                {errors.errorName}
              </span>
            )}
            <Button
              className={classes.form__user__data}
              htmlType="submit"
              type="primary"
              disabled={!isValid || !dirty || isBlockingForm}
            >
              Отправить
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );

  const returnStatusCreate = () => (
    <div>
      <span>Ваша статья успешно обновлена</span>
    </div>
  );

  return statusEditArticle ? returnStatusCreate() : returnForm();
};

const mapStateToProps = (state) => {
  const props = {
    isBlockingForm: getBlockingForm(state),
    articleOne: getArticleOne(state),
  };
  return props;
};

FormEditArticle.propTypes = {
  createArticles: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
  isBlockingForm: PropTypes.bool.isRequired,
  articleOne: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
  ]).isRequired,
};

const actionCreators = {
  createArticles: actionsArticles.createArticles,
  getArticles: actionsArticles.getArticles,
  editArticle: actionsArticles.editArticle,
};

export default connect(mapStateToProps, actionCreators)(FormEditArticle);
