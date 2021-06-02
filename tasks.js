"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { complete_task_count, company_names_by_array, comment_count_per_post, user_post_count, create_user_obj, } = require("./tasks_helper_functions");
function get_filtered_comp_names(users, todos) {
    const users_c_task = complete_task_count(todos);
    const comp_tasks_arr = [];
    for (const [key, value] of Object.entries(users_c_task)) {
        value > 3 ? comp_tasks_arr.push(parseInt(key)) : null;
    }
    const company_names = company_names_by_array(comp_tasks_arr, users);
    return company_names;
}
function get_searched_comp_names(names, search) {
    let filtered_names = names.filter((name) => name.toLowerCase().includes(search));
    if (filtered_names.length > 0) {
        return filtered_names;
    }
    return ["Can not find name by given seach term"];
}
function get_name_and_email(users, posts, comments) {
    const post_comments_count = comment_count_per_post(comments);
    const posts_ids = [];
    for (const [key, value] of Object.entries(post_comments_count)) {
        value > 3 ? posts_ids.push(parseInt(key)) : null;
    }
    const users_posts_count = user_post_count(posts_ids, posts);
    const users_ids = [];
    for (const [key, value] of Object.entries(users_posts_count)) {
        value > 2 ? users_ids.push(parseInt(key)) : null;
    }
    const resulte = create_user_obj(users_ids, users);
    return resulte;
}
function show_todos(todos) {
    let users_tasks = {};
    for (const todo of todos) {
        let u_id = todo.userId;
        if (!users_tasks[u_id]) {
            users_tasks[u_id] = { completed: 0, pending: 0 };
        }
        if (todo.completed) {
            users_tasks[u_id].completed = users_tasks[u_id].completed + 1;
        }
        else {
            users_tasks[u_id].pending = users_tasks[u_id].pending + 1;
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
