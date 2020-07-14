import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form__container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },

  form__container__addArticle: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },

  form__title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    margin: 0,
    marginTop: theme.spacing(1),
    '@media(maxWidth: 1200px)': {
      fontSize: 18,
    },
  },

  form__user: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    padding: theme.spacing(2),
  },

  form__user__data: {
    marginBottom: theme.spacing(2),
  },

  form__user__body: {
    marginBottom: theme.spacing(2),
    rows: '10',
  },

  form__block__tags: {
    display: 'flex',
    alignItems: 'center',
  },

  form__user__tags: {
    margin: '5px 0',
    padding: '5px',
    borderRadius: '5px',
  },

  form__user__btn__tags: {
    margin: '5px 0 0 5px',
  },

  error__internet: {
    textAlign: 'center',
    color: 'red',
  },

  form__user__tagList: {
    display: 'flex',
    flexDirection: 'column',
  },

  form__user__btn: {
    borderRadius: '5px',
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    color: '#ffffff',
    margin: '5px 0',
  },
}));

export default useStyles;
