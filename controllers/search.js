const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');

router.get("/results", (req, res) => {
    res.render("/results");
  });
  