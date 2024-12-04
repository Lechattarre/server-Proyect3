const router = require("express").Router()

const {
    getuser,
    getOneuser,
    getOwnerCompany,
    deleteuser,
    filterusers
} = require("../controllers/user.Controller")
const verifyToken = require("../middlewares/verifyToken")


router.get('/users/search', verifyToken, filterusers)
router.get('/users/:owner', verifyToken, getOwnerCompany)
router.delete('/users/:_id', verifyToken, deleteuser)
router.get('/users', verifyToken, getuser)
router.get('/users/:_id', verifyToken, getOneuser)





module.exports = router