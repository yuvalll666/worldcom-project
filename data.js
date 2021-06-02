"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
const base_url = "https://jsonplaceholder.typicode.com";
function get_users() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios.get(`${base_url}/users`);
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function get_todos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios.get(`${base_url}/todos`);
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function get_posts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios.get(`${base_url}/posts`);
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function get_comments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios.get(`${base_url}/comments`);
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
module.exports = {
    get_users,
    get_todos,
    get_posts,
    get_comments,
};
