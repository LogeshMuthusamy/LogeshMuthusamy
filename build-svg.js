let fs = require('fs')
let formatDistance = require('date-fns/formatDistance')

// Cheap, janky way to have variable bubble width
dayBubbleWidths = {
  Monday: 235,
  Tuesday: 235,
  Wednesday: 260,
  Thursday: 245,
  Friday: 220,
  Saturday: 245,
  Sunday: 230,
}

// Time working at PlanetScale
const today = new Date()
const todayDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
  today
)

const psTime = formatDistance(new Date(2020, 12, 14), today, {
  addSuffix: false,
})

fs.readFile('template.svg', 'utf-8', (error, data) => {
  if (error) {
    return
  }

  data = data.replace('{psTime}', psTime)
  data = data.replace('{todayDay}', todayDay)
  data = data.replace('{dayBubbleWidth}', dayBubbleWidths[todayDay])

  fs.writeFile('chat.svg', data, (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
})
