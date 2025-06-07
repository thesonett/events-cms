import cron from 'node-cron'
import { sendUpcomingEventEmails, updateAllPostsStatus, updateAllUsersStatus } from '../controller/index.js'

function scheduler() {
    // Minute (0-59), Hour (0-23),  Day of month (1-31),  Month (1-12), Day of week (0-7) (Sunday=0 or 7)
    cron.schedule('* * * * *', async () => {
        const { message } = await updateAllPostsStatus()
        console.log(message)
        console.log('Cron posts status updation method running...!\n')
    })

    // send auto email to all registered active users for upcoming events
    // at 12:00 AM and 7:00 AM everyday
    cron.schedule('0 0,7 * * *', async () => {
        await sendUpcomingEventEmails()
        console.log('Cron mail system runned!!!\n')
    })

    // autoupdate user active/inactive status
    // if any registered user account is 90 days old. mark it inactive
    cron.schedule('* * * * *', async () => {
        const { message } = await updateAllUsersStatus()
        console.log(message)
        console.log('Cron user status updation method running...!\n')
    })
}

export {
    scheduler,
}