const userRouter = require('./user');
const scoreRouter = require('./score')
function route(app) {
    app.use('/user',userRouter);
    app.use('/score',scoreRouter);
}
module.exports = route;