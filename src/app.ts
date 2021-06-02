const express: any = require("express");
const app: any = express();
const PORT: number = 3000;

app.listen(PORT, (): void => console.log(`Running on port: ${PORT}`));