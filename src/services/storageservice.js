 /**
  * Get a value from the store
  * @param  {String} key
  * @return {*}
  */
export const get = key => (key ? JSON.parse(localStorage.getItem(key)) : null);
/**
  * Set value to the store
  * @param  {String} key
  * @param  {*} value
  */
export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}
