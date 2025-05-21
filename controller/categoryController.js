import { Category } from "../models/index.js";

async function getCategories() {
    try {
        const categories = await Category.findAll({ attributes: ['id', 'category'] })
    
        if(!categories) {
            return {success: false, message: 'Categories are not found!'};
        }
    
        return { success: true, categories }
    }
    catch(error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getCategories!' }
    }
}

async function getCategoryById(id) {
    try {
        const categoryName = await Category.findOne({ where: { id }, attributes: ['name'] });
    
        if(!categoryName) {
            return {success: false, message: 'Category name not found!'};
        }
    
        return {success: true, categoryName};
    }
    catch(error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getCategoryById!' }
    }
}

export {
    getCategories,
    getCategoryById,
}