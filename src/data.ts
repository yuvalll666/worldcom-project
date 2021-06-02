const axios = require("axios");
const base_url: string = "https://jsonplaceholder.typicode.com";

import { User, Todo, Post, Comment } from "./interfaces";

/**
 * @returns Array <objects>
 */
async function get_users(): Promise<User[]> {
    try {
        const { data } = await axios.get(`${base_url}/users`);

        return data;
    } catch (err) {
        return err;
    }
}

/**
 * @returns Array <objects>
 */
async function get_todos(): Promise<Todo[]> {
    try {
        const { data } = await axios.get(`${base_url}/todos`);

        return data;
    } catch (err) {
        return err;
    }
}

/**
 * @returns all posts
 */
async function get_posts(): Promise<Post[]> {
    try {
        const { data } = await axios.get(`${base_url}/posts`);

        return data;
    } catch (err) {
        return err;
    }
}

/**
 * @returns all comments
 */
async function get_comments(): Promise<Comment[]> {
    try {
        const { data } = await axios.get(`${base_url}/comments`);

        return data;
    } catch (err) {
        return err;
    }
}

/**
 *
 * @returns Object containing all data from given API
 */
async function get_all_data(): Promise<any> {
    const users = await get_users();
    const posts = await get_posts();
    const todos = await get_todos();
    const comments = await get_comments();

    return { users, posts, todos, comments };
}

module.exports = {
    get_users,
    get_todos,
    get_posts,
    get_comments,
    get_all_data,
};
