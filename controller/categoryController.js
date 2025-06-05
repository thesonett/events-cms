import { Category } from "../models/index.js"

async function createCategory({ category }) {
    if (!category) {
        return { success: false, message: 'Category name is required!' }
    }
    
    try {
        const createdCategory = await Category.create({ category })
        return { success: true, message: 'Category created!', category: createdCategory }
    } 
    catch (error) {
        console.error('Exception occurred in createCategory!\n', error)
        return { success: false, message: 'Exception::: Category creation failed!' }
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
        console.log('Exception occured inside deleteCategoryById!\n', error)
        return { success: false, message: 'Exception::: Category not found!'}
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
        console.log('Exception occured inside updateCategoryById!\n', error)
        return { success: false, message: 'Exception::: Category not found or no changes made!' }
    }
}

async function getCategories() {
    try {
        const categories = await Category.findAll({ attributes: ['id', 'category'] })
    
        if(!categories.length) {
            return { success: false, message: 'Categories are not found!' }
        }
    
        return { success: true, categories }
    }
    catch(error) {
        console.log('Exception occured inside getCategories!\n', error)
        return { success: false, message: 'Exception::: Categories are not found!' }
    }
}

async function getCategoryById(id) {
    try {
        const category = await Category.findOne({ where: { id: id }, attributes: ['category'] })
    
        if(!category) {
            return { success: false, message: 'Category not found!' }
        }
    
        return { success: true, category }
    }
    catch(error) {
        console.log('Exception occured inside getCategoryById!\n', error)
        return { success: false, message: 'Exception::: Category not found!'}
    }
}

export {
    createCategory,
    deleteCategoryById,
    updateCategoryById,

    getCategories,
    getCategoryById,
}