require('dotenv').config();
const SECRET_SESSION = process.env.SECRET_SESSION;
const API_KEY = process.env.API_KEY;
const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('../config/ppConfig');
const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');


router.post('/', async (req, res) => {
  let Favorites = await db.favorite.findAll();
  Favorites = Favorites.map(F => F.toJSON());
  console.log(Favorites);
  res.render('search/favorite', {Favorites: Favorites});
})


  

router.post('/results', (req, res) => {
  const params = new URLSearchParams();
  params.append('grant_type', "client_credentials");
  params.append('client_id', API_KEY);
  params.append('client_secret', SECRET_SESSION);
  axios.post("https://api.petfinder.com/v2/oauth2/token", params).then(response => {
    console.log(req.body.animal);
    axios.get(`https://api.petfinder.com/v2/animals?type=${req.body.animal}&location=${req.body.Zipcode}`, {  
      headers: {
        "Authorization": `Bearer ${response.data.access_token}`
      }
    })
    .then( answer => {
      console.log("this is my answer", answer.data.animals);
      res.render('search/results', {animals: answer.data.animals})
    })
    .catch(err =>{
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",err,"**********************************************")

    })
    console.log(response.data);
  })
  .catch(err => {
    res.render('404')
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",err,"**********************************************")
  })
});

// router.delete('/favorite/:FavId', isLoggedIn, async (req, res) => {
//   db.favorite.destroy({
//     where: {petId: req.params.FavId}
//   }).then(deleted => {
//     console.log('Destroyed')
//     console.log(deleted);
//     res.render('search/favorite');
//   })
// });

router.delete('/favorite/:FavId', isLoggedIn, async (req, res) => {
  try {
    const deleted = await db.favorite.destroy({
      where: { petId: req.params.FavId }
    });
    console.log('Destroyed');
    console.log(deleted);
    const favorites = await db.favorite.findAll();
    // render the favorite template with updated favorites list
    res.render('search/favorite' , {Favorites: favorites.map(f => f.toJSON())});
  } catch (err) {
    console.log(err);
    res.status(500).render('error');
  }
});

router.get('/favorites', async (req, res) => {
  try {
    const favorites = await db.favorite.findAll();
    res.render('search/favorite', { Favorites: favorites.map(f => f.toJSON()) });
  } catch (err) {
    console.log(err);
    res.status(500).render('error');
  }
});




router.post('/animal', (req, res) => {
  console.log(req.body);
  const params = new URLSearchParams();
  params.append('grant_type', "client_credentials");
  params.append('client_id', API_KEY);
  params.append('client_secret', SECRET_SESSION);
  axios.post("https://api.petfinder.com/v2/oauth2/token", params).then(response => {
    if(response.status !== 200)throw new Error()
    axios.get(`https://api.petfinder.com/v2/animals/${req.body.animalId}`,{
      headers: {
        "Authorization": `Bearer ${response.data.access_token}`
      }
    })
    .then(animalResponse => {
      console.log(animalResponse)
      if(animalResponse.status !== 200)throw new Error()
      res.render('search/animal', {animal: animalResponse.data.animal});
    })
    .catch(err => {
      console.log(err);
    })
    })
    .catch(err => {
      console.log(err);
    })
  })


router.post('/contact', (req, res) => {
  const params = new URLSearchParams();
  params.append('grant_type', "client_credentials");
  params.append('client_id', API_KEY);
  params.append('client_secret', SECRET_SESSION);
  axios.post("https://api.petfinder.com/v2/oauth2/token", params).then(response => {
    if(response.status !== 200)throw new Error()
    axios.get(`https://api.petfinder.com/v2/animals/${req.body.animalId}`,{
      headers: {
        "Authorization": `Bearer ${response.data.access_token}`
      }
    })
    .then(animalResponse => {
      console.log(animalResponse)
      if(animalResponse.status !== 200)throw new Error()
      res.render('search/contact', {animal: animalResponse.data.animal});
    })
    .catch(err => {
      console.log(err);
      res.status(400).render('404');
    })
    })
    .catch(err => {
      console.log(err);
    })
  })

router.post('/favorite', async (req, res) => {
  try {
    console.log("@@@@@@@@@@@#############$$$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%%%%^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&Favorite Favorite Favorite Favorite Favorite Favorite. . . . - - - - ");
    //create new favorite in db
    await db.favorite.create({
      petId: parseInt(req.body.petID),
      userId: parseInt(req.body.userID),
    });
    // fetch updated list of favorites from the database
    const favorites = await db.favorite.findAll();
    // render the favorite template with updated favorites list
    res.render('search/favorite' , {Favorites: favorites.map(f => f.toJSON())});
  } catch (err) {
    console.log(err);
    res.status(500).render('error');
  }
});



// router.get('*', (req, res) => {
//   res.render('404');
// });

  module.exports = router;