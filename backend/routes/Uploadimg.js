const multerUpload = require('../middleware/Multer')();



const router = require("express").Router();

router.post('/save', multerUpload?.single('file'),fileController)

function fileController(req, res){
`http://localhost:8080/${req.file.filename}`

res.send(`http://localhost:8080/${req.file.filename}`)


}



module.exports = router;