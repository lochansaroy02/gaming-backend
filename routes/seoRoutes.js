const express = require('express');
const { createSEO, getAllSEO, getSEOById, deleteSEO, editSEO } = require('../controllers/seoController');

const router = express.Router();

router.post('/create', createSEO)
router.get('/get', getAllSEO)
router.delete('/delete/:id', deleteSEO)
router.put('/update/:id', editSEO)



module.exports = router;