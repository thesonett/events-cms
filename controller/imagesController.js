import { Images } from '../models/index.js'

async function createImage({ file_name, original_filename, size, entity_type, entity_id }) {
    if (!file_name || !original_filename || !entity_type || !entity_id) {
        return { success: false, message: 'Missing required image fields!' }
    }

    try {
        const image = await Images.create({ file_name, original_filename, size, entity_type, entity_id })
        return { success: true, message: 'Image uploaded!', image }

    } 
    catch (error) {
        console.error('Upload failed: ', error)
        return { success: false, message: 'Unable to upload image!' }
    }
}

async function deleteImageById(id) {
    try {
        const image = await Images.destroy({ where: { id } });
        return image ? { success: true, message: 'Image deleted!' } : 
                       { success: false, message: 'Unable to delete image or image not found!' };
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside deleteImageById!' }
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
        console.log(error)
        return { success: false, message: 'Exception occured inside updateImageById!' }
    }
}

async function getImageById(id) {
    try {
        const image = await Images.findOne({ where: { id } });
        return image ? { success: true, image } : { success: false, message: 'Image not found!' };
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getImageById!' }
    }
}

async function getImageByEntityId(entity_id) {
    try {
        const image = await Images.findOne({ where: { entity_id } })
        return image ? { success: true, image } : { success: false, message: 'Image not found!' }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getImageByEntityId!' }
    }
}

async function getImagesByEntityId(entity_id) {
    try {
        const images = await Images.findAll({ where: { entity_id } })
        return images.length ? { success: true, images } : { success: false, message: 'Images not found!' }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getImagesByEntityId!' }
    }
}

async function getImageByFileName(file_name) {
    try {
        const image = await Images.findOne({ where: { file_name } })
        return image ? { success: true, image } : { success: false, message: 'Image not found!' }
    } 
    catch (error) {
        console.error(error)
        return { success: false, message: 'Exception occurred in getImageByFileName!' }
    }
}

async function getImagesByFileName(file_name) {
    try {
        const images = await Images.findAll({ where: { file_name } });
        return images.length ? { success: true, images } : { success: false, message: 'Images not found!' }
    } 
    catch (error) {
        console.error(error)
        return { success: false, message: 'Exception occurred in getImagesByFileName!' }
    }
}

async function getImageByFileNameAndEntityType(file_name, entity_type) {
    try {
        const image = await Images.findOne({ where: { file_name, entity_type } })
        return image ? { success: true, image } : { success: false, message: 'Image not found!' }
    } 
    catch (error) {
        console.error(error)
        return { success: false, message: 'Exception occurred in getImageByFileNameAndEntityType!' }
    }
}

async function getImagesByFileNameAndEntityType(file_name, entity_type) {
    try {
        const images = await Images.findAll({ where: { file_name, entity_type } })
        return images.length ? { success: true, images } : { success: false, message: 'Images not found!' }
    } 
    catch (error) {
        console.error(error)
        return { success: false, message: 'Exception occurred in getImagesByFileNameAndEntityType!' }
    }
}

async function getImageByEntityRef(entity_id, entity_type) {
    try {
        const image = await Images.findOne({ where: { entity_id, entity_type } })
        return image ? { success: true, image } : { success: false, message: 'Image not found!' }
    } 
    catch (error) {
        console.error(error)
        return { success: false, message: 'Exception occurred in getImageByEntityRef!' }
    }
}

async function getImagesByEntityRef(entity_id, entity_type) {
    try {
        const images = await Images.findAll({ where: { entity_id, entity_type } });
        return images.length ? { success: true, images } : { success: false, message: 'Images not found!' }
    } 
    catch (error) {
        console.error(error);
        return { success: false, message: 'Exception occurred in getImagesByEntityRef!' }
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
        return { success: false, message: 'Unable to fetch paginated images!' }
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
        console.error('Error in fetchImagesByCondition!\n', error)
        return { success: false, message: 'Exception occurred in fetchImagesByCondition!' }
    }
}

export {
    createImage,
    deleteImageById,
    updateImageById,

    getImageById,

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
