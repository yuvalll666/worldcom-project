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
const express = require("express");
const app = express();
const PORT = 3000;
const { get_all_data } = require("./data");
const { get_filtered_comp_names, get_searched_comp_names, get_name_and_email, show_todos, } = require("./tasks");
app.get("/:search*?", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { users, posts, todos, comments } = yield get_all_data();
    const search_term = req.params.search
        ? req.params.search.toLowerCase()
        : null;
    const filtered_comp_names = get_filtered_comp_names(users, todos);
    const searched_comp_names = search_term
        ? get_searched_comp_names(filtered_comp_names, search_term)
        : filtered_comp_names;
    const user_info = get_name_and_email(users, posts, comments);
    const user_todos = show_todos(todos);
    return res.send({
        task_1: filtered_comp_names,
        task_2: searched_comp_names,
        task_3: user_info,
        task_4: user_todos,
    });
}));
app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
