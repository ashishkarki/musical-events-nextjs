export const dateToLocalString = (date) => {
  const dateString = new Date(date).toLocaleDateString('en-US')

  return dateString
}
