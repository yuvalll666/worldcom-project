"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function get_filtered_comp_names(users, todos) {
    let c_task_users = {};
    for (const todo of todos) {
        if (todo.completed) {
            const u_id = todo.userId;
            if (!c_task_users[u_id]) {
                c_task_users[u_id] = 1;
            }
            else {
                c_task_users[u_id] = c_task_users[u_id] + 1;
            }
        }
    }
    let tasks_complete = [];
    for (const [key, value] of Object.entries(c_task_users)) {
        value > 3 ? tasks_complete.push(parseInt(key)) : null;
    }
    let company_names = [];
    for (const user of users) {
        if (tasks_complete.includes(user.id)) {
            if (!company_names.includes(user.company.name)) {
                company_names.push(user.company.name);
            }
        }
    }
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
    let post_comments = {};
    for (const comment of comments) {
        if (!post_comments[comment.postId]) {
            post_comments[comment.postId] = 1;
        }
        else {
            post_comments[comment.postId] = post_comments[comment.postId] + 1;
        }
    }
    let posts_ids = [];
    for (const [key, value] of Object.entries(post_comments)) {
        value > 3 ? posts_ids.push(parseInt(key)) : null;
    }
    let users_posts_count = {};
    for (const post of posts) {
        if (posts_ids.includes(post.id)) {
            if (!users_posts_count[post.userId]) {
                users_posts_count[post.userId] = 1;
            }
            else {
                users_posts_count[post.userId] =
                    users_posts_count[post.userId] + 1;
            }
        }
    }
    let users_ids = [];
    for (const [key, value] of Object.entries(users_posts_count)) {
        value > 2 ? users_ids.push(parseInt(key)) : null;
    }
    let resulte = [];
    for (const user of users) {
        if (users_ids.includes(user.id)) {
            let geo = user.address.geo ? user.address.geo : null;
            if (geo && geo.lat && geo.lng) {
                resulte.push({ name: user.name, email: user.email });
            }
        }
    }
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
