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
const userRouter = require('./routers/user.route');
const taskRouter = require('./routers/task.route');

//Routing the requests
app.use('/userRouter',userRouter);
app.use('/userRouter',userRouter);

app.use('/taskRouter',taskRouter);
app.use('/taskRouter',taskRouter);
app.use('/taskRouter',taskRouter);
app.use('/taskRouter',taskRouter);
app.use('/taskRouter',taskRouter);
app.use('/taskRouter',taskRouter);
app.use('/taskRouter',taskRouter);

app.listen(process.env.PORT);