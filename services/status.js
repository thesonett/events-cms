function getStatus(date, time) {
  const now = new Date()
  const postDateTime = new Date(`${date}T${time}`)

  const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const postDate = new Date(postDateTime.getFullYear(), postDateTime.getMonth(), postDateTime.getDate())

  const diffMinutes = Math.abs((postDateTime - now) / 60000)

  if (postDate.getTime() === nowDate.getTime()) {
    if (diffMinutes <= 1) {
      return "ongoing"
    }
    return now > postDateTime ? "completed" : "upcoming"
  }

  return postDate > nowDate ? "upcoming" : "completed"
}


export {
    getStatus,
}
