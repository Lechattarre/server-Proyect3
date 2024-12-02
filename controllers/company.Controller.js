const mongoose = require('mongoose')

const Company = require('../models/Company.model')

const getCompany = (req, res, next) => {
    Company
        .find()
        // .select({})
        .then(Companyes => res.json(Companyes))
        .catch(err => next(err))
}

const getOneCompany = (req, res, next) => {

    const { _id: CompanyId } = req.params

    if (!mongoose.Types.ObjectId.isValid(CompanyId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }

    Company
        .findById(CompanyId)
        // .select({})
        .then(Companyes => res.json(Companyes))
        .catch(err => next(err))
}

const saveCompany = (req, res, next) => {
    const { name,
        description,
        category,
        address,
        phone,
    } = req.body
    const { _id: owner } = req.payload

    Company
        .create({ name, description, category, phone, address, owner })
        .then(Companyes => res.status(201).json(Companyes))
        .catch(err => next(err))
}

const editCompany = (req, res, next) => {
    const { name,
        description,
        category,
        address,
        phone, } = req.body
    const { _id: companyId } = req.params


    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }


    Company
        .findByIdAndUpdate(companyId, { name, description, category, phone, address }, { runValidators: true })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const deleteCompany = (req, res, next) => {

    const { _id: companyId } = req.params

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }

    Company
        .findByIdAndDelete(companyId)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const filterCompanies = (req, res, next) => {
    Company
        .find(req.query)
        .then(Companyes => res.json(Companyes))
        .catch(err => next(err))
}

module.exports = {
    getCompany,
    getOneCompany,
    saveCompany,
    editCompany,
    deleteCompany,
    filterCompanies
}