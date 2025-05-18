import { Images } from '../models/index.js'

async function uploadImage({ file_name, original_filename, size, entity_type, entity_id }) {
    try {
        const image = await Images.create({ file_name, original_filename, size, entity_type, entity_id });
        return { success: true, message: 'Image uploaded!', image };
    } 
    catch (error) {
        console.error('Upload failed: ', error);
        return { success: false, message: 'Unable to upload image!'};
    }
}

async function deleteImage(id) {
    const image = await Images.destroy({ where: { id }})

    if(!image) {
        return {success: false, message: 'Unable to delete image or image not found!'};
    }

    return { success: true, message: 'Image deleted!', image };
}

async function updateImageById(id, updates) {
    const [affectedRows] = await Images.update(updates, { where: { id } });

    if (!affectedRows) {
        return { success: false, message: 'Image not found or no changes made!' };
    }

    const updatedImage = await Images.findByPk(id);
    
    return { success: true, message: 'Image got updated!', updatedImage };
}

async function getImagesByEntityType(entity_type) {
    const images = await Images.findAll({ where: { entity_type }})

    if(!images.length) {
        return {success: false, message: 'Images not found!'};
    }

    return {success: true, images };
}

async function getImagesById(id) {
    const images = await Images.findAll({ where: { id }})

    if(!images.length) {
        return {success: false, message: 'Images not found!'};
    }

    return {success: true, images };
}

async function getImageById(id) {
    const image = await Images.findOne({ where: { id }})

    if(!image) {
        return {success: false, message: 'Image not found!'};
    }

    return {success: true, image };
}

async function getImagesByEntityId(entity_id) {
    const images = await Images.findAll({ where: { entity_id }})

    if(!images.length) {
        return {success: false, message: 'Images not found!'};
    }

    return {success: true, images };
}

async function getImageByEntityId(entity_id) {
    const image = await Images.findOne({ where: { entity_id }})

    if(!image) {
        return {success: false, message: 'Image not found!'};
    }

    return {success: true, image };
}

export {
    uploadImage,
    deleteImage,
    updateImageById,
    getImagesByEntityType,
    getImagesByEntityId,
    getImageByEntityId,
    getImagesById,
    getImageById,
}