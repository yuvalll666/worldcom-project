const express: any = require("express");
const app: any = express();
const PORT: number = 3000;
const { get_all_data } = require("./data");
const {
    get_filtered_comp_names,
    get_searched_comp_names,
    get_name_and_email,
    show_todos,
} = require("./tasks");

/**
 * GET request to "/" with optional string as search_term
 * sends data to user
 */
app.get("/:search*?", async (req: any, res: any) => {
    // Get all needed data from API
    const { users, posts, todos, comments } = await get_all_data();

    const search_term: string | null = req.params.search
        ? req.params.search.toLowerCase()
        : null;

    const filtered_comp_names: Array<string> = get_filtered_comp_names(
        users,
        todos
    );
    const searched_comp_names: Array<string> = search_term
        ? get_searched_comp_names(filtered_comp_names, search_term)
        : filtered_comp_names;

    const user_info: Array<{}> = get_name_and_email(users, posts, comments);
    const user_todos: { [key: string]: { [key: string]: number } } =
        show_todos(todos);

    return res.send({
        task_1: filtered_comp_names,
        task_2: searched_comp_names,
        task_3: user_info,
        task_4: user_todos,
    });
});

app.listen(PORT, (): void => console.log(`Running on port: ${PORT}`));
