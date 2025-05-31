import { Activities } from '../models/index.js'

async function createActivity({ actions, actionsPerformedOn, user_id }) {
    if (!actions) {
        return { success: false, message: 'Action is required!' }
    }

    try {
        const count = await Activities.count()
        if (count >= 10) {
            const oldestActivities = await Activities.findAll({ order: [['createdAt', 'ASC']], limit: count - 9 })
            const idsToDelete = oldestActivities.map(act => act.id)
            
            await Activities.destroy({ where: { id: idsToDelete } })
        }

        const timestamp = actionsPerformedOn || new Date()
        const activity = await Activities.create({ actions, actionsPerformedOn: timestamp, user_id })

        return { success: true, message: 'Action created!', activity }
    }
    catch(error) {
        console.error('Exception occurred in createActivity!\n', error)
        return { success: false, message: 'Exception::: Activity creation failed!' }
    }
}

async function updateActivity(id, updates) {
    try {
        const activity = await Activities.findByPk(id)
        if (!activity) {
            return { success: false, message: 'Activity not found!' }
        }

        const updatedActivity = await activity.update(updates, { where: {id} })
        return { success: true, message: 'Activity updated!', updatedActivity }

    } 
    catch (error) {
        console.error('Exception occurred in updateActivity!\n', error)
        return { success: false, message: 'Exception::: Activity update failed!' }
    }
}

async function deleteActivity(id) {
    try {
        const activity = await Activities.findByPk(id)

        if (!activity) {
            return { success: false, message: 'Activity not found!' }
        }

        await activity.destroy()
        return { success: true, message: 'Activity deleted successfully!' }
    } 
    catch (error) {
        console.error('Exception occurred in deleteActivity!\n', error)
        return { success: false, message: 'Exception::: Activity deletion failed!' }
    }
}

async function deleteActivityByUserId(user_id) {
    try {
        const activity = await Activities.destroy({ where: { user_id } })

        if (!activity) {
            return { success: false, message: 'Activity not found!' }
        }

        return { success: true, message: 'Activity deleted successfully!' }
    } 
    catch (error) {
        console.error('Exception occurred in deleteActivityByUserId!\n', error)
        return { success: false, message: 'Exception::: Activity deletion failed!' }
    }
}


async function getActivities(user_id) {
    try {
        const activities = await Activities.findAll({ where: { user_id } })
    
        if(!activities.length) {
            return { success: false, message: 'Activities are not found!' }
        }
    
        return { success: true, activities }
    }
    catch(error) {
        console.log('Exception occured inside getActivities!\n', error)
        return { success: false, message: 'Exception::: Activities are not found!' }
    }
}

export {
    createActivity,
    updateActivity,
    deleteActivity,
    deleteActivityByUserId,
    getActivities,
}