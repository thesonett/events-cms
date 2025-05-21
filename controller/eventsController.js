import { Events } from '../models/index.js'

async function createEvent({title, description, date, category_id, organizing_committee_id, role_id}) {
    try {
        const event = await Events.create({title, description, date, category_id, organizing_committee_id, role_id})

        return { success: true, message: 'event created!', event }
    }
    catch(error) {
        console.error('Event creation failed! \n', error)
        return { success: false, message: 'Unable to upload image!'}
    }
}

async function deleteEventById(id) {
    try {
        const event = await Events.destroy({ where: { id }})
    
        if(!event) {
            return {success: false, message: 'Unable to delete event or event not found!'};
        }
    
        return { success: true, message: 'event deleted!' };
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside deleteEventById!' }
    }
}

async function updateEventById(id, updates) {
    try {
        const [status] = await Events.update(updates, { where: { id } });

        if (!status) {
            return { success: false, message: 'Event not found or nothing to update.' }
        }

        const updatedEvent = await Events.findByPk(id);
        return { success: true, message: 'Event updated successfully!', updatedEvent }

    } 
    catch (error) {
        console.error('Failed to update event!', error);
        return { success: false, message: 'Unable to update event!' }
    }
}

async function getEventsByCategoryId(category_id) {
    try {
        const events = await Events.findAll({ where: { category_id } })
        return events.length ? { success: true, events } : 
                               { success: false, message: 'Events not found!' }
    } 
    catch (error) {
        console.error('Exception in getEventsByCategoryId!\n', error)
        return { success: false, message: 'Exception occurred inside getEventsByCategoryId!' }
    }
}


async function getEventsByOrganizingCommitteeId(organizing_committee_id) {
    try {
        const events = await Events.findAll({ where: { organizing_committee_id } })
    
        if(!events || !events.length) {
            return { success: false, message: 'Events not found!'}
        }
    
        return {success: true, events}
    }
    catch(error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getEventsByOrganizingCommitteeId!' }
    }
}

async function getEventsByRoleId(role_id) {
    try {
        const events = await Events.findAll({ where: { role_id } })
    
        if(!events || !events.length) {
            return { success: false, message: 'Events not found!'}
        }
    
        return {success: true, events}
    }
    catch (error) {
        console.error('Exception occurred inside getEventsByRoleId!\n', error);
        return { success: false, message: 'Exception occurred inside getEventsByRoleId!' }
    }

}

async function getEventById(id) {
    const event = await Events.findByPk(id)
    return event ? { success: true, event } : { success: false, message: 'Event not found!' }
}


async function getEventsById(id) {
    try {
        const events = await Events.findAll({ where: { id } })
    
        if(!events || !events.length) {
            return { success: false, message: 'Events not found!'}
        }
    
        return { success: true, events }
    }
    catch(error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getEventsById!' }
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
            return eventYear === targetYear;
        });

        return { success: true, filteredEvents }
    }
    catch(error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getEventsByYear!' }
    }
}

export {
    createEvent,
    deleteEventById,
    updateEventById,

    getEventById,
    getEventsById,

    getEventsByCategoryId,
    getEventsByOrganizingCommitteeId,
    getEventsByRoleId,
    getEventsByYear,
}