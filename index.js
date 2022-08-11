const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const userRouter = require('./src/routers/user');
const bookRouter = require('./src/routers/user');
require('./src/db/mongoose');
const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(bookRouter);

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});