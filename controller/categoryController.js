import { Category } from "../models/index.js";

async function getCategories() {
    const categories = await Category.findAll({ attributes: ['id', 'category'] })

    if(!categories) {
        return {success: false, message: 'Categories are not found!'};
    }

    return { success: true, categories }
}

async function getCategoryById(id) {
    const categoryName = await Category.findOne({ where: { id }, attributes: ['name'] });

    if(!categoryName) {
        return {success: false, message: 'Category name not found!'};
    }

    return {success: true, categoryName};
}

export {
    getCategories,
    getCategoryById,
}