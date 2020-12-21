const express = require('express');
const { response } = require('express');
const app = express();

app.get("/welcome", (request, response) => {
    response.send("Hello World!");
});

app.listen(3000, () => {
    console.log('Express web app on localhost: 3000');
});