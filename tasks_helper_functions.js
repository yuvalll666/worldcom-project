"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function complete_task_count(todos) {
    let users_c_task = {};
    for (const todo of todos) {
        if (todo.completed) {
            const u_id = todo.userId.toString();
            if (!users_c_task[u_id]) {
                users_c_task[u_id] = 1;
            }
            else {
                users_c_task[u_id] = users_c_task[u_id] + 1;
            }
        }
    }
    return users_c_task;
}
function company_names_by_array(users_ids, users) {
    let company_names = [];
    for (const user of users) {
        if (users_ids.includes(user.id)) {
            if (!company_names.includes(user.company.name)) {
                company_names.push(user.company.name);
            }
        }
    }
    return company_names;
}
function comment_count_per_post(comments) {
    const c_count = {};
    for (const comment of comments) {
        if (!c_count[comment.postId]) {
            c_count[comment.postId] = 1;
        }
        else {
            c_count[comment.postId] = c_count[comment.postId] + 1;
        }
    }
    return c_count;
}
function user_post_count(posts_ids, posts) {
    let p_count = {};
    for (const post of posts) {
        if (posts_ids.includes(post.id)) {
            if (!p_count[post.userId]) {
                p_count[post.userId] = 1;
            }
            else {
                p_count[post.userId] = p_count[post.userId] + 1;
            }
        }
    }
    return p_count;
}
function create_user_obj(users_ids, users) {
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
module.exports = {
    complete_task_count,
    company_names_by_array,
    comment_count_per_post,
    user_post_count,
    create_user_obj,
};
