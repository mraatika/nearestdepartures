import { padNumber } from '../../utils/utils';
import Time from './time';

/**
 * Get date as string containing date, month and year separated by periods
 * @private
 * @param {Date} date
 * @returns {string}
 */
const getDateAsText = date => `${padNumber(date.getDate())}.${padNumber(date.getMonth())}.${date.getFullYear()}`;

/**
 * Component for displaying date and time in human readable form
 * @constructs DateTime
 * @param {Object} props
 * @param {number} props.time Time in seconds
 */
export default ({ time }) => {
  const date = new Date(time * 1000);
  const dateText = getDateAsText(date);

  return <span>{dateText} <Time time={time} actualTime={true} /></span>;
};
