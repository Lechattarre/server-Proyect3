const router = require("express").Router()


const { verify } = require("jsonwebtoken")
const {
    getuser,
    getOneuser,
    saveuser,
    edituser,
    deleteuser,
    filterusers
} = require("../controllers/user.Controller")
const verifyToken = require("../middlewares/verifyToken")


router.get('/users/search', verifyToken, filterusers)
router.post('/users', verifyToken, saveuser)
router.put('/users/:id', verifyToken, edituser)
router.delete('/users/:id', verifyToken, deleteuser)
router.get('/users', verifyToken, getuser)
router.get('/users/:id', verifyToken, getOneuser)





module.exports = router