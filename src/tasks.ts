import { User, Todo, Post, Comment } from "./interfaces";
const {
    complete_task_count,
    company_names_by_array,
    comment_count_per_post,
    user_post_count,
    create_user_obj,
} = require("./tasks_helper_functions");

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
    const users_c_task: { [key: string]: any } = complete_task_count(todos);

    //  Create an array with users ids that have more then 3 tasks completed
    const comp_tasks_arr: Array<number> = [];
    for (const [key, value] of Object.entries(users_c_task)) {
        value > 3 ? comp_tasks_arr.push(parseInt(key)) : null;
    }

    // Filtered company names
    const company_names = company_names_by_array(comp_tasks_arr, users);

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
    const post_comments_count: { [key: number]: any } =
        comment_count_per_post(comments);

    // Create an array of posts that has more then 3 comments
    const posts_ids: Array<number> = [];
    for (const [key, value] of Object.entries(post_comments_count)) {
        value > 3 ? posts_ids.push(parseInt(key)) : null;
    }

    /*
    Create an object contains user_id as key and amount of posts
    with more then 3 comments as value
    */
    const users_posts_count: { [key: number]: any } = user_post_count(
        posts_ids,
        posts
    );

    const users_ids: Array<number> = [];
    for (const [key, value] of Object.entries(users_posts_count)) {
        value > 2 ? users_ids.push(parseInt(key)) : null;
    }

    const resulte: Array<{ [key: string]: any }> = create_user_obj(
        users_ids,
        users
    );

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
