import { Views } from '../models/index.js'

async function createViews(post_id) {
    try {
        const [viewRecord, created] = await Views.findOrCreate({ where: { post_id }, defaults: { views: 1 } })
    
        if (!created) {
          viewRecord.views += 1
          await viewRecord.save()
        }
    }
    catch(error) {
        console.error('Exception occurred inside createViews method!\n', error)
    }
}

async function getViews(post_id) {
    try {
        const view = await Views.findOne({ where: { post_id }, attributes: ['id', 'views', 'post_id'] })
        if (!view) {
            return { success: false, message: 'No views found for this post!'}
        }

        return { success: true, view }
    }
    catch(error) {
        console.error('Exception occurred inside getViews method!\n', error)
        return { success: false, message: 'Unable to get views for this post!'}
    }
}

async function getTotalViews() {
    try {
        const totalViews = await Views.sum('views')
        return { success: true, totalViews }
    } 
    catch (error) {
        console.error('Exception occurred inside getTotalViews method!\n', error)
        return { success: false, message: 'Unable to calculate total views!' }
    }
}

export {
    createViews,
    getViews,
    getTotalViews,
}