import { User, Todo, Post, Comment } from "./interfaces";

/**
 * Filters company names by pre-known parameters
 * @param users - Array of user objects
 * @param todos - Array of Todo objects
 * @returns Array of strings containing uniqe company names
 */
function get_filtered_comp_names(
    users: Array<User>,
    todos: Array<Todo>
): Array<string> {
    // Create object with user_id as key and amount of complete tasks as value
    let c_task_users: { [key: number]: any } = {};
    for (const todo of todos) {
        if (todo.completed) {
            const u_id: number = todo.userId;
            if (!c_task_users[u_id]) {
                c_task_users[u_id] = 1;
            } else {
                c_task_users[u_id] = c_task_users[u_id] + 1;
            }
        }
    }

    //  Create an array with users ids that have more then 3 tasks completed
    let tasks_complete: Array<number> = [];
    for (const [key, value] of Object.entries(c_task_users)) {
        value > 3 ? tasks_complete.push(parseInt(key)) : null;
    }

    // Create an array of company names (strings) that if they are included in tasks_complete array
    let company_names: Array<string> = [];
    for (const user of users) {
        if (tasks_complete.includes(user.id)) {
            if (!company_names.includes(user.company.name)) {
                company_names.push(user.company.name);
            }
        }
    }

    return company_names;
}

/**
 * Filteres an array of strings to a new one
 * @param names - Array of strings containing comapny names
 * @param search - String, user input
 * @returns - Array of strings, filtered company names
 */
function get_searched_comp_names(
    names: Array<string>,
    search: string
): Array<string> {
    let filtered_names: Array<string> = names.filter((name) =>
        //Return a string if containes search term
        name.toLowerCase().includes(search)
    );
    if (filtered_names.length > 0) {
        return filtered_names;
    }

    return ["Can not find name by given seach term"];
}

/**
 * Filteres specific users according to pre-known parameters
 * @param users - Array of User objects
 * @param posts - Array of Post objects
 * @param comments - Array of Comment objects
 * @returns an array of filtered users object of name and email
 */
function get_name_and_email(
    users: Array<User>,
    posts: Array<Post>,
    comments: Array<Comment>
): Array<{ [key: string]: string }> {
    /*
    Create an object contains post_id as key and amount of
    comments per post as value
    */
    let post_comments: { [key: number]: any } = {};
    for (const comment of comments) {
        if (!post_comments[comment.postId]) {
            post_comments[comment.postId] = 1;
        } else {
            post_comments[comment.postId] = post_comments[comment.postId] + 1;
        }
    }

    // Create an array of posts that has more then 3 comments
    let posts_ids: Array<number> = [];
    for (const [key, value] of Object.entries(post_comments)) {
        value > 3 ? posts_ids.push(parseInt(key)) : null;
    }

    /*
    Create an object contains user_id as key and amount of posts
    with more then 3 comments as value
     */
    let users_posts_count: { [key: number]: any } = {};
    for (const post of posts) {
        if (posts_ids.includes(post.id)) {
            if (!users_posts_count[post.userId]) {
                users_posts_count[post.userId] = 1;
            } else {
                users_posts_count[post.userId] =
                    users_posts_count[post.userId] + 1;
            }
        }
    }

    // Create an array of user ids that have more the 2 posts from users_posts_count
    let users_ids: Array<number> = [];
    for (const [key, value] of Object.entries(users_posts_count)) {
        value > 2 ? users_ids.push(parseInt(key)) : null;
    }

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

/**
 * Show amount of tasks both completed and pandding per user and
 * @param todos - Array of Todo objects
 * @returns Array of objects containing completed and pending tasks per user
 */
function show_todos(todos: Array<Todo>) {
    let users_tasks: { [key: number]: any } = {};

    for (const todo of todos) {
        let u_id = todo.userId;
        if (!users_tasks[u_id]) {
            users_tasks[u_id] = { completed: 0, pending: 0 };
        }

        if (todo.completed) {
            users_tasks[u_id].completed = users_tasks[u_id].completed + 1;
        } else {
            users_tasks[u_id]!.pending = users_tasks[u_id]!.pending + 1;
        }
    }

    return users_tasks;
}

module.exports = {
    get_filtered_comp_names,
    get_searched_comp_names,
    get_name_and_email,
    show_todos,
};
