import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

const formatDate = (date) => formatDistanceToNow(new Date(date), { locale: ru });

export default formatDate;
