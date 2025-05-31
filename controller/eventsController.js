import { Events } from '../models/index.js'

async function createEvent({title, description, date, category_id, organizing_committee_id, role_id}) {
    if (!title || !date || !category_id || !organizing_committee_id || !role_id) {
        return { success: false, message: 'Missing required event fields!' }
    }

    try {
        const event = await Events.create({title, description, date, category_id, organizing_committee_id, role_id})
        return { success: true, message: 'Event created!', event }
    }
    catch(error) {
        console.error('Exception occurred inside createEvent!\n', error)
        return { success: false, message: 'Exception::: Event creation failed!' }
    }
}

async function deleteEventById(id) {
    try {
        const event = await Events.destroy({ where: { id }})
        return { success: true, message: 'Event deleted!' }
    }
    catch (error) {
        console.log('Exception occured inside deleteEventById!\n', error)
        return { success: false, message: 'Exception::: Unable to delete event or event not found!'}
    }
}

async function deleteEventByOrganizingCommitteeId(organizing_committee_id) {
    try {
        const event = await Events.destroy({ where: { organizing_committee_id }})
        return { success: true, message: 'Event deleted!' }
    }
    catch (error) {
        console.log('Exception occured inside deleteEventByOrganizingCommitteeId!\n', error)
        return { success: false, message: 'Exception::: Unable to delete event or event not found!'}
    }
}

async function updateEventById(id, updates) {
    try {
        const [status] = await Events.update(updates, { where: { id } })

        if (!status) {
            return { success: false, message: 'Event not found or nothing to update.' }
        }

        const updatedEvent = await Events.findByPk(id)
        return { success: true, message: 'Event updated successfully!', updatedEvent }

    } 
    catch (error) {
        console.error('Exception occurred inside updateEventById!\n', error)
        return { success: false, message: 'Exception::: Unable to update event!' }
    }
}

async function getEventsByCategoryId(category_id) {
    try {
        const events = await Events.findAll({ where: { category_id } })
        return events.length ? { success: true, events } : 
                               { success: false, message: 'Events not found!' }
    } 
    catch (error) {
        console.error('Exception occurred inside getEventsByCategoryId!\n', error)
        return { success: false, message: 'Exception::: Events not found!' }
    }
}

async function getEventsByOrganizingCommitteeId(organizing_committee_id) {
    try {
        const events = await Events.findAll({ where: { organizing_committee_id } })
    
        if(!events || !events.length) {
            return { success: false, message: 'Events not found!'}
        }
    
        return { success: true, events }
    }
    catch(error) {
        console.log('Exception occured inside getEventsByOrganizingCommitteeId!\n', error)
        return { success: false, message: 'Exception::: Events not found!'}
    }
}

async function getEventsByRoleId(role_id) {
    try {
        const events = await Events.findAll({ where: { role_id } })
    
        if(!events || !events.length) {
            return { success: false, message: 'Events not found!'}
        }
    
        return { success: true, events }
    }
    catch (error) {
        console.error('Exception occurred inside getEventsByRoleId!\n', error)
        return { success: false, message: 'Exception::: Events not found!'}
    }

}

async function getEventById(id) {
    try {
        const event = await Events.findByPk(id)

        return event ? 
            { success: true, event } : 
            { success: false, message: 'Event not found!' }
    }
    catch(error) {
        console.error('Exception occurred inside getEventById!\n', error)
        return { success: false, message: 'Exception::: Event not found!'}
    }
}

async function getAllEvents() {
    try {
        const events = await Events.findAll()
    
        if(!events || !events.length) {
            return { success: false, message: 'Events not found!'}
        }
    
        return { success: true, events }
    }
    catch (error) {
        console.error('Exception occurred inside getAllEvents!\n', error)
        return { success: false, message: 'Exception::: Events not found!'}
    }
}


async function getEventsByYear(id, date) {
    if (!date || !date.includes('/')) {
        return { success: false, message: 'Invalid date format!' }
    }

    try {
        const response = await getEventsById(id)

        if (!response.success || !response.events.length) {
            return { success: false, message: 'No events found for given ID' }
        }

        const targetYear = date.split('/')[2]; // date -> 17/05/2025 -> 2025
        const filteredEvents = response.events.filter(event => {
            const eventYear = new Date(event.date).getFullYear().toString()
            return eventYear === targetYear
        });

        return { success: true, filteredEvents }
    }
    catch(error) {
        console.log('Exception occured inside getEventsByYear!\n', error)
        return { success: false, message: 'Exception::: No events found for given ID!' }
    }
}

export {
    createEvent,
    deleteEventById,
    deleteEventByOrganizingCommitteeId,
    updateEventById,

    getEventById,
    getEventsByCategoryId,
    getEventsByOrganizingCommitteeId,
    getEventsByRoleId,
    getEventsByYear,
    getAllEvents,
}