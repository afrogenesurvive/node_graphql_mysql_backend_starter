const moment = require('moment-timezone');
const { ProductionCompany, Contact, Show, Tag, ProductionCompanyUser } = require('../../db/models');
const { Op } = require('sequelize');
const { Query } = require('./auth');

module.exports = {
    Query: {
        getAllProductionCompanies: async (_, {args}, { req }) => {
            console.log("Resolver: getAllProductionCompanies...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const query = JSON.parse(args);
            let include = [];
            let where_like = [];
            let where = { is_deleted: 'N' };

            query.includes.forEach(incl => {
                switch (incl) {
                case 'contacts':
                    include.push({ 
                    model: contact, 
                    as: 'contacts', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'shows':
                    include.push({ 
                    model: show, 
                    as: 'shows', 
                    foreignKey: 'production_company_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'tags':
                    include.push({ 
                    model: tag, 
                    as: 'tags', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'likes':
                    include.push({ 
                    model: like, 
                    as: 'likes', 
                    foreignKey: 'entity_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                    });
                    break;
                case 'production_company_users':
                    include.push({ 
                    model: production_company_user, 
                    as: 'production_company_users', 
                    foreignKey: 'production_company_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                default:
                    break;
                }
            });

            query.where_like.forEach(whl => {
                where_like.push({ [whl.key]: { [Op.like]: `%${whl.value}%` } });
            });

            query.where.forEach(wh => {
                where[wh.key] = wh.value;
            });

            where[Op.or] = where_like;

            const productionCompanies = await ProductionCompany.findAll({
                where: where,
                include: include
            });
            return productionCompanies.map(productionCompany => {
                return {
                ...productionCompany.dataValues,
                _id: productionCompany.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getProductionCompany: async (_, { id }, { req }) => {
            console.log("Resolver: getProductionCompanyById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const productionCompany = await ProductionCompany.findOne({
                where: { 
                id: id,
                is_deleted: 'N' 
                },
                include: [
                { 
                    model: contact, 
                    as: 'contacts', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: show, 
                    as: 'shows', 
                    foreignKey: 'production_company_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: tag, 
                    as: 'tags', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: like, 
                    as: 'likes', 
                    foreignKey: 'entity_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                },
                { 
                    model: production_company_user, 
                    as: 'production_company_users', 
                    foreignKey: 'production_company_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                ]
            });
            if (!productionCompany) {
                throw new Error('Production Company not found');
            }
            return {
                ...productionCompany.dataValues,
                _id: productionCompany.id
            };
            } catch (err) {
            throw err;
            }
        },
        getProductionCompanyByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getProductionCompanyByQuery...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const query = JSON.parse(args);
            let include = [];
            let where_like = [];
            let where = { is_deleted: 'N' };

            query.includes.forEach(incl => {
                switch (incl) {
                case 'contacts':
                    include.push({ 
                    model: contact, 
                    as: 'contacts', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'shows':
                    include.push({ 
                    model: show, 
                    as: 'shows', 
                    foreignKey: 'production_company_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'tags':
                    include.push({ 
                    model: tag, 
                    as: 'tags', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'likes':
                        include.push({ 
                        model: like, 
                        as: 'likes', 
                        foreignKey: 'entity_id', 
                        where: { is_deleted: 'N' }, 
                        required: false 
                        });
                    break;
                case 'production_company_users':
                    include.push({ 
                    model: production_company_user, 
                    as: 'production_company_users', 
                    foreignKey: 'production_company_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                default:
                    break;
                }
            });

            query.where_like.forEach(whl => {
                where_like.push({ [whl.key]: { [Op.like]: `%${whl.value}%` } });
            });

            query.where.forEach(wh => {
                where[wh.key] = wh.value;
            });

            where[Op.or] = where_like;

            const productionCompanies = await ProductionCompany.findAll({
                where: where,
                include: include
            });
            return productionCompanies.map(productionCompany => {
                return {
                ...productionCompany.dataValues,
                _id: productionCompany.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createProductionCompany: async (_, { productionCompanyInput }, { req }) => {
            console.log("Resolver: createProductionCompany...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const productionCompany = await ProductionCompany.create({
                ...productionCompanyInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...productionCompany.dataValues,
                _id: productionCompany.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateProductionCompany: async (_, { id, productionCompanyInput }, { req }) => {
            console.log("Resolver: updateProductionCompany...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const productionCompany = await ProductionCompany.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!productionCompany) {
                throw new Error('Production Company not found');
            }
            await productionCompany.update({
                ...productionCompanyInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...productionCompany.dataValues,
                _id: productionCompany.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteProductionCompany: async (_, { id }, { req }) => {
            console.log("Resolver: deleteProductionCompany...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const productionCompany = await ProductionCompany.findOne({ where: { id: id } });
            if (!productionCompany) {
                throw new Error('Production Company not found');
            }
            await productionCompany.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...productionCompany.dataValues,
                _id: productionCompany.id
            };
            } catch (err) {
            throw err;
            }
        },
    },
};