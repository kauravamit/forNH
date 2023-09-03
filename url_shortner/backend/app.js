'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const verifyUserMiddleware = require('./middleware/verifyuser');
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login')
const urlRouter = require('./routes/url')
const db = require('./db/models');
const port = 3000

const app = express();

    db.sequelize.sync();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/', indexRouter);

    app.use('/api/register', registerRouter);
    app.use('/api/login',loginRouter);
   


    app.use(verifyUserMiddleware);

    app.use('/api/url',urlRouter);
// app.use(function(error, req, res, next) {
//     //catch json error
//     res.status(400).send({
//         message: 'Bad Request'
//     });
// });



//error handler
// app.use(function(err,req,res,next) {
//     //set locals, only providing error in development
//     res.locals.message = err.message;

//     //render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
app.listen(port, () => console.log(`server started, listening PORT ${port}`))

module.exports = app;
