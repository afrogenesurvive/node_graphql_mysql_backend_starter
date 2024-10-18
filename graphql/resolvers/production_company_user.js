const moment = require('moment-timezone');
const { production_company_user, user, production_company } = require('../../db/models');
const { Op } = require('sequelize');
const { Query } = require('./auth');

module.exports = {
    Query: {
        getAllProductionCompanyUsers: async (_, {args}, { req }) => {
            console.log("Resolver: getAllProductionCompanyUsers...");
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
                case 'user':
                    include.push({ 
                    model: user, 
                    as: 'user', 
                    foreignKey: 'user_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'production_company':
                    include.push({ 
                    model: production_company, 
                    as: 'production_company', 
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

            const productionCompanyUsers = await production_company_user.findAll({
                where: where,
                include: include
            });
            return productionCompanyUsers.map(productionCompanyUser => {
                return {
                ...productionCompanyUser.dataValues,
                _id: productionCompanyUser.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getProductionCompanyUser: async (_, { id }, { req }) => {
            console.log("Resolver: getProductionCompanyUserById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const productionCompanyUser = await production_company_user.findOne({
                where: { 
                id: id,
                is_deleted: 'N' 
                },
                include: [
                { 
                    model: user, 
                    as: 'user', 
                    foreignKey: 'user_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: production_company, 
                    as: 'production_company', 
                    foreignKey: 'production_company_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                ]
            });
            if (!productionCompanyUser) {
                throw new Error('Production Company User not found');
            }
            return {
                ...productionCompanyUser.dataValues,
                _id: productionCompanyUser.id
            };
            } catch (err) {
            throw err;
            }
        },
        getProductionCompanyUserByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getProductionCompanyUserByQuery...");
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
                case 'user':
                    include.push({ 
                    model: user, 
                    as: 'user', 
                    foreignKey: 'user_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'production_company':
                    include.push({ 
                    model: production_company, 
                    as: 'production_company', 
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

            const productionCompanyUsers = await production_company_user.findAll({
                where: where,
                include: include
            });
            return productionCompanyUsers.map(productionCompanyUser => {
                return {
                ...productionCompanyUser.dataValues,
                _id: productionCompanyUser.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createProductionCompanyUser: async (_, { productionCompanyUserInput }, { req }) => {
            console.log("Resolver: createProductionCompanyUser...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const productionCompanyUser = await production_company_user.create({
                ...productionCompanyUserInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...productionCompanyUser.dataValues,
                _id: productionCompanyUser.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateProductionCompanyUser: async (_, { id, productionCompanyUserInput }, { req }) => {
            console.log("Resolver: updateProductionCompanyUser...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const productionCompanyUser = await production_company_user.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!productionCompanyUser) {
                throw new Error('Production Company User not found');
            }
            await productionCompanyUser.update({
                ...productionCompanyUserInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...productionCompanyUser.dataValues,
                _id: productionCompanyUser.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteProductionCompanyUser: async (_, { id }, { req }) => {
            console.log("Resolver: deleteProductionCompanyUser...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const productionCompanyUser = await production_company_user.findOne({ where: { id: id } });
            if (!productionCompanyUser) {
                throw new Error('Production Company User not found');
            }
            await productionCompanyUser.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...productionCompanyUser.dataValues,
                _id: productionCompanyUser.id
            };
            } catch (err) {
            throw err;
            }
        },
    },
};