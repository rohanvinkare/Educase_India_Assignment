const express = require('express');
const { createSchool, listSchools, deleteSchool, deleteAllSchools } = require('../controllers/schoolController');

const router = express.Router();

router.post('/addSchool', createSchool);
router.get('/listSchools', listSchools);
router.delete('/deleteSchool', deleteSchool);
router.delete('/deleteAllSchools', deleteAllSchools);
module.exports = router;
