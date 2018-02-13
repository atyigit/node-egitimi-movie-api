const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');

router.post('/', function(req, res, next) {
  /*//Eğer bady de çok fazla alan yoksa bu şekilde olabilir
  const { director_id,title,category,country,year,imdb_score,date} = req.body;

  const movie = new Movie({
      director_id: director_id,
      title : title,
      category: category,
      country:country,
      year: year,
      imdb_score: imdb_score
  });*/


    //Eğer bady de çok fazla alan varsa
    const movie = new Movie(req.body);

  /*movie.save((err,data) =>{
    if(err)
      res.json(err);

    res.json({ status : 1});
  });*/

  //Promise metoduyla daha temiz bir kodlama için
    //mongoose.Promise = global.Promise; db.js ye ekle
    const promise = movie.save();

    promise.then((data) =>{
      res.json({ status : 1 });
    }).catch((err) =>{
      res.json(err);
    });
});

module.exports = router;
