//Importing express package
const express = require('express');
const app = express();
const verify = require('./middleware/auth');
const fs = require('fs');

//Importing cors package
const cors = require('cors');

app.use(express.json())

//CORS policy
app.use(cors());

//Importing router files
const userRouter = require('./routers/user.route');
const taskRouter = require('./routers/task.route');

//Routing the requests
app.use('/users', userRouter);

app.use('/tasks', verify.verifyToken, taskRouter);

app.listen(process.env.PORT);
