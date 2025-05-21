import { Posts } from '../models/index.js'

async function createPost({ title, description, venue, start, location, duration, organizer, status, event_id }) {
    try {
        const post = await Posts.create({ title, description, venue, start, location, duration, organizer, status, event_id })

        return { success: true, message: 'post created!', post }
    }
    catch(error) {
        console.error('Post creation failed!\n', error)
        return { success: false, message: 'Unable to create post!'}
    }
}

async function deletePostByEventId(event_id) {
    try {
        const post = await Posts.destroy({ where: { event_id }})
    
        if(!post) {
            return {success: false, message: 'Unable to delete post or post not found!'};
        }
    
        return { success: true, message: 'Post deleted successfully' }

    }
    catch(error) {
        console.error(error)
        return { success: false, message: 'Exception occurred inside deletePostByEventId!' }
    }
}

async function deletePostById(id) {
    try {
        const post = await Posts.destroy({ where: { id }})
    
        if(!post) {
            return {success: false, message: 'Unable to delete post or post not found!'};
        }
    
        return { success: true, message: 'Post deleted successfully' }

    }
    catch(error) {
        console.error(error)
        return { success: false, message: 'Exception occurred inside deletePostById!' }
    }
}

async function updatePostByEventId(event_id, updates) {
    try {
        const [status] = await Posts.update(updates, { where: { event_id } });

        if (!status) {
            return { success: false, message: 'Post not found or nothing to update.' }
        }

        const updatedPost = await getPostsByEventId(event_id);
        return { success: true, message: 'Post updated successfully!', updatedPost }

    } 
    catch (error) {
        console.error(error);
        return { success: false, message: 'Exception occurred inside updatePostByEventId!' }
    }
}

async function updatePostById(id, updates) {
    try {
        const [status] = await Posts.update(updates, { where: { id } });

        if (!status) {
            return { success: false, message: 'Post not found or nothing to update.' }
        }

        const updatedPost = await Posts.findByPk(id);
        return { success: true, message: 'Post updated successfully!', updatedPost }

    } 
    catch (error) {
       console.error(error);
       return { success: false, message: 'Exception occurred inside updatePostById!' }
    }
}

async function getPostByEventId(event_id) {
    try {
        const post = await Posts.findOne({ where: {event_id} })
        return post ? {success: true, post} : {success: false, message: 'Post not found!'}
    }
    catch(error) {
        console.error(error)
        return { success: false, message: 'Exception occurred inside getPostsByEventId!' }
    }
}

async function getPostById(id) {
    try {
        const post = await Posts.findByPk(id)
        return post ? { success: true, post } : { success: false, message: 'Post not found!' }
    } 
    catch (error) {
        console.error(error)
        return { success: false, message: 'Exception occurredinside getPostById!' }
    }
}

async function getPostsByEventId(event_id) {
    try {
        // gonna help in pagination later
        const { count, rows } = await Posts.findAndCountAll({ where: { event_id } });
        return count ? { success: true, posts: rows } : { success: false, message: 'No posts found' };
    }
    catch(error) {
        console.error(error)
        return { success: false, message: 'Exception occurred inside getPostsByEventId!' }
    }
}

async function getPostByOrganizerName(organizer) {
    try {
        const post = await Posts.findOne({ where: { organizer } })
        return post ? {success: true, post} : {success: false, message: 'Post not found!'}
    }
    catch(error) {
        console.error(error)
        return { success: false, message: 'Exception occurred inside getPostByOrganizerName!' }
    }
}

async function getPostsByOrganizerName(organizer) {
    try {
        // gonna help in pagination later
        const { count, rows } = await Posts.findAndCountAll({ where: { organizer } })
        return count ? { success: true, posts: rows } : { success: false, message: 'Posts not found!' }

    }
    catch(error) {
        console.error(error)
        return { success: false, message: 'Exception occurred inside getPostsByOrganizerName!' }
    }
}

async function getPostByStatus(status) {
    try {
        const post = await Posts.findOne({ where: { status } })
        return post ? {success: true, post} : {success: false, message: 'Post not found!'}
    }
    catch(error) {
        console.error(error)
        return { success: false, message: 'Exception occurred inside getPostByStatus!' }
    }
}

async function getPostsByStatus(status) {
    try {
        const posts = await Posts.findAll({ where: { status } })
        return posts.length ? {success: true, posts} : {success: false, message: 'Posts not found!'}
    }
    catch(error) {
        console.error(error)
        return { success: false, message: 'Exception occurred inside getPostsByStatus!' }
    }
}

// enhanced for testing purpose
async function findOnePostByField(field, value) {
    try {
        const post = await Posts.findOne({ where: { [field]: value } })
        return post ? { success: true, post } : { success: false, message: 'Post not found!' }
    } catch (error) {
        console.error(error)
        return { success: false, message: `Exception occurred inside getPostBy${capitalize(field)}!` }
    }
}


export {
    createPost,

    deletePostByEventId,
    deletePostById,

    updatePostByEventId,
    updatePostById,

    getPostByEventId,
    getPostsByEventId,

    getPostByOrganizerName,
    getPostsByOrganizerName,

    getPostByStatus,
    getPostsByStatus,

    getPostById,
    findOnePostByField,
}