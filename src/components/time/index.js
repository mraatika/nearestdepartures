import { padNumber } from '../../utils/utils';
/**
 * Get time as string containing hours and minutes separated by a colon
 * @private
 * @param {Date} date
 * @returns {string}
 */
const timeToString = date => `${padNumber(date.getHours())}:${padNumber(date.getMinutes())}`;

/**
 * Component for displaying time in human readable form
 * @constructs Time
 * @param {Object} props
 * @param {number} props.time Time in seconds
 * @param {boolean} props.actualTime if true will display the time always in HH:mm form
 * @return {Time}
 */
export default ({ time, actualTime }) => {
  const now = Date.now();
  const date = new Date(time * 1000);
  const timeLeftInMins = Math.floor(((date - now) / 1000) / 60);
  const timeText = (actualTime || date < now || timeLeftInMins >= 10)
    ?  timeToString(date)
    : timeLeftInMins < 1 ? 'Now' : `${timeLeftInMins} min`;

  return <span>{timeText}</span>;
};
