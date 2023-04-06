//Importing express package
let express = require('express');
let app = express();

//Importing cors package
let cors = require('cors');

//CORS policy
app.use(cors(
    {
        origin: ['https://www.w3schools.com'],
        methods: ['get','post', 'put', 'delete'] 
    }
));

//Importing router files
const loginUserRouter = require('./routers/userRouter/login.route');
const registerUserRouter = require('./routers/userRouter/register.route');

const createTaskRouter = require('./routers/taskRouter/createTask.route');
const deleteTaskRouter = require('./routers/taskRouter/deleteTask.route');
const filterTaskRouter = require('./routers/taskRouter/filterTask.route');
const readTaskRouter = require('./routers/taskRouter/readTasks.route');
const readTaskByIDRouter = require('./routers/taskRouter/readTaskByID.route');
const sortTaskRouter = require('./routers/taskRouter/sortTask.route');
const updateTaskRouter = require('./routers/taskRouter/updateTask.route');

//Routing the requests
app.use('/userRouter/login',loginUserRouter);
app.use('/userRouter/register',registerUserRouter);

app.use('/taskRouter/createTask',createTaskRouter);
app.use('/taskRouter/deleteTask',deleteTaskRouter);
app.use('/taskRouter/filterTask',filterTaskRouter);
app.use('/taskRouter/readTasks',readTaskRouter);
app.use('/taskRouter/readTaskByID',readTaskByIDRouter);
app.use('/taskRouter/sortTask',sortTaskRouter);
app.use('/taskRouter/updateTask',updateTaskRouter);

app.listen(process.env.PORT);