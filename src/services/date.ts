import dayjs from 'dayjs';
import deLocale from 'dayjs/locale/de';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import {MONTHS} from 'constants/date';

dayjs.extend(customParseFormat);
dayjs.locale({...deLocale, months: MONTHS}, undefined, false);

export default dayjs;
