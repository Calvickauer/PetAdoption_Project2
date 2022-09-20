const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');

router.get("/results", (req, res) => {
    res.render("/results");
  });
  

  router.post('/results', (req, res) => {
    const params = new URLSearchParams();// whats this do
    params.append('grant_type', "client_credentials");
    params.append('client_id', process.env.API_KEY);
    params.append('client_secret', SECRET_SESSION);
    axios.post("https://api.petfinder.com/v2/oauth2/token", params).then(response => {
      console.log(req.body.animal);
      axios.get(`https://api.petfinder.com/v2/animals?type=${req.body.animal}&location=${req.body.Zipcode}`, {  // `https://api.petfinder.com/v2/organizations?location=${req.body.Zipcode}
        headers: {
          "Authorization": `Bearer ${response.data.access_token}`
        }
      })
      .then( answer => {
        console.log("this is my answer", answer.data.animals);
        res.render('results', {animals: answer.data.animals})
      })
      console.log(response.data);
    })
    .catch(err => {
      console.log(err)
    })
  })
  
  module.exports = router;