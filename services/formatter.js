function formatDate(myDate) {
  const date = new Date(myDate)
  const options = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

function formatTime(myTime) {
  const [hour, minute] = myTime.split(":")
  const h = parseInt(hour, 10)
  const ampm = h >= 12 ? "PM" : "AM"
  const hour12 = h % 12 || 12
  return `${hour12}:${minute} ${ampm}`
}

export {
    formatDate,
    formatTime,
}