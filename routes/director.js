const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

router.post('/', (req, res, next) => {
  const director = new Director(req.body);

  const promise = director.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/', (req, res) => {
    const promise = Director.aggregate([
        {
            $lookup : {
                from : 'movies',//collections adı
                localField : '_id',
                foreignField : 'director_id',
                as : 'movies'//dönen datanın atanacağı değişken
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group : {
              _id : {
                _id: '$_id',
                name: '$name',
                surname: '$surname',
                bio: '$bio'
              },
              movies: {
                $push:'$movies' //yukarda dönen data ile tanımlanan
              }
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:director_id', (req, res) => {
    const promise = Director.aggregate([
        {
          $match:{
            '_id': mongoose.Types.ObjectId(req.params.director_id)
          }
        },
        {
            $lookup : {
                from : 'movies',//collections adı
                localField : '_id',
                foreignField : 'director_id',
                as : 'movies'//dönen datanın atanacağı değişken
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group : {
                _id : {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push:'$movies' //yukarda dönen data ile tanımlanan
                }
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
