import dayjs from 'dayjs';
import nbLocale from 'dayjs/locale/nb';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.locale(nbLocale, undefined, false);

export default dayjs;
