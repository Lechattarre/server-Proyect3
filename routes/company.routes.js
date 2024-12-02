const router = require("express").Router()


const { verify } = require("jsonwebtoken")
const {
    getCompany,
    getOneCompany,
    saveCompany,
    editCompany,
    deleteCompany,
    filterCompanies
} = require("../controllers/company.Controller")
const verifyToken = require("../middlewares/verifyToken")


router.get('/Companies/search', verifyToken, filterCompanies)
router.post('/Companies', verifyToken, saveCompany)
router.put('/Companies/:id', verifyToken, editCompany)
router.delete('/Companies/:id', verifyToken, deleteCompany)
router.get('/Companies', verifyToken, getCompany)
router.get('/Companies/:id', verifyToken, getOneCompany)





module.exports = router