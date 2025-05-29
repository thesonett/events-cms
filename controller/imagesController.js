import { Images } from '../models/index.js'

async function createImage({ file_name, original_filename, image_url, size, entity_type, entity_id, event_id }) { 
    try {
        const image = await Images.create({ file_name, original_filename, image_url, size, entity_type, entity_id, event_id, posts_id: null })
        return { success: true, message: 'Image uploaded!', image }

    } 
    catch (error) {
        console.error('Exception occurred inside createImage!\n', error)
        return { success: false, message: 'Exception::: Unable to create image!' }
    }
}

async function deleteImageById(id) {
    try {
        const image = await Images.destroy({ where: { id } });
        return image ? { success: true, message: 'Image deleted!' } : 
                       { success: false, message: 'Unable to delete image or image not found!' };
    }
    catch (error) {
        console.error('Exception occurred inside deleteImageById!\n', error)
        return { success: false, message: 'Exception::: Unable to delete image or image not found!' }
    }
}

async function deleteImageByEventId(event_id) {
    try {
        const image = await Images.destroy({ where: { event_id, entity_type: 'event' } })
        return image ? { success: true, message: 'Image deleted!' } : 
                       { success: false, message: 'Unable to delete image or image not found!' }
    }
    catch (error) {
        console.error('Exception occurred inside deleteImageByEventId!\n', error)
        return { success: false, message: 'Exception::: Unable to delete image or image not found!' }
    }
}

async function updateImageById(id, updates) {
    try {
        const [status] = await Images.update(updates, { where: { id } })
        if (!status) {
            return { success: false, message: 'Image not found or no changes made!' }
        }
    
        const updatedImage = await Images.findByPk(id);
        return { success: true, message: 'Image updated!', updatedImage }
    }
    catch (error) {
        console.log('Exception occurred inside updateImageById!\n', error)
        return { success: false, message: 'Exception::: Image not found or no changes made!'}
    }
}

async function updateImageByEventId(event_id, updates) {
    try {
        const [status] = await Images.update(updates, { where: { event_id } })
        if (!status) {
            return { success: false, message: 'Image not found or no changes made!' }
        }
    
        const updatedImage = await Images.findOne({ where: { event_id } })
        return { success: true, message: 'Image updated!', updatedImage }
    }
    catch (error) {
        console.log('Exception occurred inside updateImageByEventId!\n', error)
        return { success: false, message: 'Exception::: Image not found or no changes made!'}
    }
}

async function getImageById(id) {
    try {
        const image = await Images.findOne({ where: { id } });
        return image ? { success: true, image } : { success: false, message: 'Image not found!' };
    }
    catch (error) {
        console.log('Exception occurred inside getImageById!\n', error)
        return { success: false, message: 'Exception::: Image not found!' }
    }
}

async function getImageByEventId(event_id) {
    try {
        const image = await Images.findOne({ where: { event_id, entity_type: 'event' } });
        return image ? { success: true, image } : { success: false, message: 'Image not found!' };
    }
    catch (error) {
        console.log('Exception occurred inside getImageByEventsId!\n', error)
        return { success: false, message: 'Exception::: Image not found!' }
    }
}

async function getImageByEntityId(entity_id) {
    try {
        const image = await Images.findOne({ where: { entity_id } })
        return image ? { success: true, image } : { success: false, message: 'Image not found!' }
    }
    catch (error) {
        console.log('Exception occurred inside getImageByEntityId!\n', error)
        return { success: false, message: 'Exception::: Image not found!' }
    }
}

async function getImagesByEntityId(entity_id) {
    try {
        const images = await Images.findAll({ where: { entity_id } })
        return images.length ? 
            { success: true, images } : 
            { success: false, message: 'Images not found!' }
    }
    catch (error) {
        console.log('Exception occurred inside getImagesByEntityId!\n', error)
        return { success: false, message: 'Exception::: Images not found!' }
    }
}

async function getImageByFileName(file_name) {
    try {
        const image = await Images.findOne({ where: { file_name } })
        return image ? { success: true, image } : { success: false, message: 'Image not found!' }
    } 
    catch (error) {
        console.error('Exception occurred in getImageByFileName!\n', error)
        return { success: false, message: 'Exception::: Image not found!' }
    }
}

async function getImagesByFileName(file_name) {
    try {
        const images = await Images.findAll({ where: { file_name } });
        return images.length ? 
            { success: true, images } : 
            { success: false, message: 'Images not found!' }
    } 
    catch (error) {
        console.error('Exception occurred in getImagesByFileName!\n', error)
        return { success: false, message: 'Exception::: Images not found!' }
    }
}

async function getImageByFileNameAndEntityType(file_name, entity_type) {
    try {
        const image = await Images.findOne({ where: { file_name, entity_type } })
        return image ? { success: true, image } : { success: false, message: 'Image not found!' }
    } 
    catch (error) {
        console.error('Exception occurred in getImageByFileNameAndEntityType!\n', error)
        return { success: false, message: 'Exception::: Images not found!' }
    }
}

async function getImagesByFileNameAndEntityType(file_name, entity_type) {
    try {
        const images = await Images.findAll({ where: { file_name, entity_type } })
        return images.length ? { success: true, images } : { success: false, message: 'Images not found!' }
    } 
    catch (error) {
        console.error('Exception occurred in getImagesByFileNameAndEntityType!\n', error)
        return { success: false, message: 'Exception::: Images not found!' }
    }
}

async function getImageByEntityRef(entity_id, entity_type) {
    try {
        const image = await Images.findOne({ where: { entity_id, entity_type } })
        return image ? { success: true, image } : { success: false, message: 'Image not found!' }
    } 
    catch (error) {
        console.error('Exception occurred in getImageByEntityRef!\n', error)
        return { success: false, message: 'Exception::: Image not found!' }
    }
}

async function getImagesByEntityRef(entity_id, entity_type) {
    try {
        const images = await Images.findAll({ where: { entity_id, entity_type } });
        return images.length ? { success: true, images } : { success: false, message: 'Images not found!' }
    } 
    catch (error) {
        console.error('Exception occurred in getImagesByEntityRef\n!', error);
        return { success: false, message: 'Exception::: Images not found!' }
    }
}

async function getPaginatedImages({ page = 1, limit = 10, filters = {} }) {
    const offset = (page - 1) * limit

    try {
        const { count, rows: images } = await Images.findAndCountAll({ where: filters, offset, limit })
        const totalPages = Math.ceil(count / limit);

        return { success: true, pageInfo: { totalItems: count, totalPages, currentPage: page, limit }, images }
    } 
    catch (error) {
        console.error('Exception occurred in getPaginatedImages!\n', error)
        return { success: false, message: 'Exception::: Unable to fetch paginated images!' }
    }
}

// enhancement function for testing purpose
async function fetchImagesByCondition(condition, multiple = false) {
    try {
        const result = multiple
            ? await Images.findAll({ where: condition })
            : await Images.findOne({ where: condition })

        if (!result || (Array.isArray(result) && result.length === 0)) {
            return { success: false, message: 'Image(s) not found!' }
        }

        return { success: true, [multiple ? 'images' : 'image']: result }
    } 
    catch (error) {
        console.error('Exception occurred inside fetchImagesByCondition!\n', error)
        return { success: false, message: 'Exception::: Image(s) not found!' }
    }
}

export {
    createImage,

    deleteImageById,
    deleteImageByEventId,

    updateImageById,
    updateImageByEventId,

    getImageById,
    getImageByEventId,

    getImageByEntityId,
    getImagesByEntityId,

    getImageByFileName,
    getImagesByFileName,

    getImageByFileNameAndEntityType,
    getImagesByFileNameAndEntityType,

    getImageByEntityRef,
    getImagesByEntityRef,

    getPaginatedImages,
    fetchImagesByCondition,
}
