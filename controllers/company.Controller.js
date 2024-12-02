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

    const { id: CompanyId } = req.params

    if (!mongoose.types.ObjectId.isValid(CompanyId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }

    Company
        .find(CompanyId)
        // .select({})
        .then(Companyes => res.json(Companyes))
        .catch(err => next(err))
}

const saveCompany = (req, res, next) => {
    const { name,
        description,
        cover,
        price,
        stock,
        specs,
        category,
        subcategory,
        brand,
        company } = req.body
    const { _id: owner } = req.payload

    Company
        .create({ name, description, cover, price, stock, specs, category, subcategory, brand, company, owner })
        .then(Companyes => res.status(201).json(Companyes))
        .catch(err => next(err))
}

const editCompany = (req, res, next) => {
    const { name,
        description,
        cover,
        price,
        stock,
        specs,
        category,
        subcategory,
        brand,
        company } = req.body
    const { id: CompanyId } = req.params


    if (!mongoose.types.ObjectId.isValid(CompanyId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }


    Company
        .findByIdAndUpdate(CompanyId, { name, description, cover, price, stock, specs, category, subcategory, brand, company }, { runValidators: true })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const deleteCompany = (req, res, next) => {

    const { id: CompanyId } = req.params

    if (!mongoose.types.ObjectId.isValid(CompanyId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }

    Company
        .findByIdAndDelete(CompanyId)
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