/**
 * @param {*} date
 * @returns date in local format like 12/29/2021
 */
export const dateToLocalString = (date) => {
  const dateString = new Date(date).toLocaleDateString('en-US')

  return dateString
}

/**
 * @param date in string or any other format
 * @returns ISO date string like "2021-11-25T04:17:06.350Z"
 */
export const dateToISOString = (date) => {
  const dateString = new Date(date).toISOString()

  return dateString
}

export const logger = (...args) => {
  console.log(...args)
}