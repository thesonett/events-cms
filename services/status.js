function getStatus(date, time) {
  const now = new Date()
  const postDateTime = new Date(`${date}T${time}`)

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const postOnlyDate = new Date(postDateTime.getFullYear(), postDateTime.getMonth(), postDateTime.getDate())

  if (postOnlyDate.getTime() === today.getTime()) {
    // If the event is today, compare time
    if (now >= postDateTime) {
      return "ongoing"
    }
    else {
      return "upcoming"
    }
  }
  else if (postOnlyDate > today) {
    return "upcoming"
  }
  else {
    return "completed"
  }
}

export {
    getStatus,
}
