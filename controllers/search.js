require('dotenv').config();
const SECRET_SESSION = process.env.SECRET_SESSION;
const API_KEY = process.env.API_KEY;
const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('../config/ppConfig');
const db = require('../models');
  

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
    console.log(response.data);
  })
  .catch(err => {
    console.log(err)
  })
});


router.post('/animal', (req, res) => {
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

  module.exports = router;