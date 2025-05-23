import { Category } from "../models/index.js";

async function createCategory({ id, category }) {
    try {
        if (!category) {
            return { success: false, message: 'Category name is required!' }
        }

        const createdCategory = await Category.create({ id, category })
        return { success: true, message: 'Category created!', category: createdCategory }
    } 
    catch (error) {
        console.error('Error in createCategory!\n', error)
        return { success: false, message: 'Exception occurred in createCategory!' }
    }
}

async function deleteCategoryById(id) {
    try {
        const category = await Category.destroy({ where: { id } })
        
        return category ? 
            { success: true, message: 'Category got deleted!'} : 
            { success: false, message: 'Category not found!'}
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside deleteCategoryById!' }
    }
}

async function updateCategoryById(id, updates) {
    try {
        const [status] = await Category.update(updates, { where: { id } })
    
        if (!status) {
            return { success: false, message: 'Category not found or no changes made!' }
        }
    
        const updatedCategory = await Category.findByPk(id)
        return { success: true, message: 'Category got updated!', updatedCategory }
    }
    catch (error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside updateCategoryById!' }
    }
}

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
        const categoryName = await Category.findOne({ where: { id }, attributes: ['name'] })
    
        if(!categoryName) {
            return {success: false, message: 'Category name not found!'}
        }
    
        return {success: true, categoryName}
    }
    catch(error) {
        console.log(error)
        return { success: false, message: 'Exception occured inside getCategoryById!' }
    }
}

export {
    createCategory,
    deleteCategoryById,
    updateCategoryById,

    getCategories,
    getCategoryById,
}