//Importing express package
let express = require('express');
let app = express();
let verify = require('./middleware/auth');

//Importing cors package
let cors = require('cors');

app.use(express.json())

//CORS policy
app.use(cors(
    {
        origin: ['https://www.w3schools.com'],
        methods: ['get','post', 'put', 'delete'] 
    }
));

//Importing router files
const userRouter = require('./routers/user.route');
const taskRouter = require('./routers/task.route');
const { log } = require('./utils/logger');

//Routing the requests
app.use('/users', userRouter);

app.use('/tasks', verify.verifyToken, taskRouter);

app.listen(process.env.PORT);