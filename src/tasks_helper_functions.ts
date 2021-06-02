import { User, Todo, Post, Comment } from "./interfaces";
/**
 * Count amount of completed tasks per users and create an object
 * @param todos - Array of Todo objects
 * @returns object with user_id as key and amount of complete tasks as value
 */
function complete_task_count(todos: Array<Todo>): { [key: string]: number } {
    let users_c_task: { [key: string]: any } = {};
    for (const todo of todos) {
        if (todo.completed) {
            const u_id: string = todo.userId.toString();
            if (!users_c_task[u_id]) {
                users_c_task[u_id] = 1;
            } else {
                users_c_task[u_id] = users_c_task[u_id] + 1;
            }
        }
    }

    return users_c_task;
}

/**
 * Create an array of company names (strings) if they are included in
 * users_ids array
 * @param users_ids
 * @param users
 * @returns array of strings (company names)
 */
function company_names_by_array(users_ids: Array<number>, users: Array<User>) {
    let company_names: Array<string> = [];
    for (const user of users) {
        if (users_ids.includes(user.id)) {
            if (!company_names.includes(user.company.name)) {
                company_names.push(user.company.name);
            }
        }
    }

    return company_names;
}

/**
 * Create object with post_id as key and count of comments as value
 * @param comments - Array of Comment objects
 * @returns object
 */
function comment_count_per_post(comments: Array<Comment>) {
    const c_count: { [key: string]: any } = {};
    for (const comment of comments) {
        if (!c_count[comment.postId]) {
            c_count[comment.postId] = 1;
        } else {
            c_count[comment.postId] = c_count[comment.postId] + 1;
        }
    }

    return c_count;
}

/**
 * Create an object contains user_id as key and amount of posts
 * with more then 3 comments as value
 * @param posts_ids
 * @param posts
 * @returns
 */
function user_post_count(posts_ids: Array<number>, posts: Array<Post>) {
    let p_count: { [key: number]: any } = {};
    for (const post of posts) {
        if (posts_ids.includes(post.id)) {
            if (!p_count[post.userId]) {
                p_count[post.userId] = 1;
            } else {
                p_count[post.userId] = p_count[post.userId] + 1;
            }
        }
    }

    return p_count;
}

/**
 * Filteres users by given users_ids array and creating an
 * object of user info
 * @param users_ids
 * @param users
 * @returns an array of users containing username and email
 */
function create_user_obj(users_ids: Array<number>, users: Array<User>) {
    // Create an array of users containing username and email
    let resulte: Array<{ [key: string]: any }> = [];
    for (const user of users) {
        if (users_ids.includes(user.id)) {
            // If no location of user don't include
            let geo = user.address.geo ? user.address.geo : null;
            if (geo && geo.lat && geo.lng) {
                resulte.push({ name: user.name, email: user.email });
            }
        }
    }

    return resulte;
}

module.exports = {
    complete_task_count,
    company_names_by_array,
    comment_count_per_post,
    user_post_count,
    create_user_obj,
};
