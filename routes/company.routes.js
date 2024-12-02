const router = require("express").Router()

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
router.put('/Companies/:_id', verifyToken, editCompany)
router.delete('/Companies/:_id', verifyToken, deleteCompany)
router.get('/Companies', verifyToken, getCompany)
router.get('/Companies/:_id', verifyToken, getOneCompany)





module.exports = router