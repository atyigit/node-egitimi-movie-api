const mongoose =require('mongoose');

module.exports= () =>{
    mongoose.connect('mongodb://movie_user:abcd1234@ds133558.mlab.com:33558/movie-api');
    mongoose.connection.on('open',() => {
        //console.log('MongoDB : CONNECTED');
    });

    mongoose.connection.on('error',(err) => {
        console.log('MongoDB : ERROR', err);
    });

    mongoose.Promise = global.Promise;
};
