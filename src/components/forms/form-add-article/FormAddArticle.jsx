import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './FormAddArticle.css';
import {
  Formik, Form, Field, FieldArray,
} from 'formik';
import { Button } from 'antd';
import { TextField, TextareaAutosize } from '@material-ui/core';
import { uniqueId } from 'lodash';
import validationSchema from './validation';
import useStyles from '../styled';
import { getBlockingForm } from '../../../redux/selectors';
import * as actionsArticles from '../../../redux/actions/actionsArticles';

const FormAddArticle = ({ createArticles, isBlockingForm }) => {
  const [statusCreateArticle, setStatusCreateArticle] = useState(null);

  const classes = useStyles();
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tags: '',
    tagList: [],
  };

  const normalizeData = ({ tagList }) => {
    const newTagList = tagList.filter(({ tags }) => tags !== '');
    const arrTag = newTagList.reduce((acc, { tags }) => [...acc, tags], []);
    return Array.from(new Set(arrTag));
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
      await createArticles(articles);
      setStatusCreateArticle(true);
    } catch (error) {
      if (error.isAxiosError) {
        setFieldError('errorName', 'Нет подключения к интернету');
      }
    }
  };

  const returnForm = () => (
    <div className={classes.form__container__addArticle}>
      <h1 className={classes.form__title}>Новая статья</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmitForm}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
          setFieldError,
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
              // eslint-disable-next-line no-unused-vars
              render={({ push, remove }) => (
                <div className={classes.form__user__tagList}>
                  <Field
                    size="small"
                    name="tags"
                    as="input"
                    component={TextField}
                    className={classes.form__user__body}
                    placeholder="напишите тег"
                    rows="10"
                    variant="outlined"
                    onChange={handleChange('tags')}
                    onBlur={handleBlur('tags')}
                    value={values.tags}
                    disabled={isBlockingForm}
                  />
                  {values.tagList.map((tag, index) => (
                    <div key={tag.id}>
                      <div className={classes.form__block__tags}>
                        <span>{tag.tags}</span>
                        <Button
                          className={classes.form__user__btn__tags}
                          onClick={() => remove(index)}
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
                      if (values.tags.trim()) {
                        values.tagList.push({
                          id: uniqueId(),
                          tags: values.tags,
                        });
                        setFieldValue('tags', '');
                      } else {
                        setFieldError('errorName', 'Тэг недолжен быть пустым');
                      }
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
      <span>Ваша статья успешно добавлена</span>
    </div>
  );

  return statusCreateArticle ? returnStatusCreate() : returnForm();
};

const mapStateToProps = (state) => {
  const props = {
    isBlockingForm: getBlockingForm(state),
  };
  return props;
};

FormAddArticle.propTypes = {
  createArticles: PropTypes.func.isRequired,
  isBlockingForm: PropTypes.bool.isRequired,
};

const actionCreators = {
  createArticles: actionsArticles.createArticles,
};

export default connect(mapStateToProps, actionCreators)(FormAddArticle);
