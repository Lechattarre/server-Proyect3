const router = require("express").Router()

const {
    getuser,
    getOneuser,
    edituser,
    deleteuser,
    filterusers
} = require("../controllers/user.Controller")
const verifyToken = require("../middlewares/verifyToken")


router.get('/users/search', verifyToken, filterusers)
// router.put('/users/:_id', verifyToken, edituser)
// router.delete('/users/:_id', verifyToken, deleteuser)
router.get('/users', verifyToken, getuser)
router.get('/users/:_id', verifyToken, getOneuser)





module.exports = router