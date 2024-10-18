const moment = require('moment-timezone');
const { show_user, user, show, venue, event, review, rating, tag } = require('../../db/models');
const { Op } = require('sequelize');
const { Query } = require('./auth');

module.exports = {
    Query: {
        getAllShowUsers: async (_, {args}, { req }) => {
            console.log("Resolver: getAllShowUsers...");
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
                case 'show':
                    include.push({ 
                    model: show, 
                    as: 'show', 
                    foreignKey: 'show_id',
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

            const showUsers = await show_user.findAll({
                where: where,
                include: include
            });
            return showUsers.map(showUser => {
                return {
                ...showUser.dataValues,
                _id: showUser.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getShowUser: async (_, { id }, { req }) => {
            console.log("Resolver: getShowUserById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const showUser = await show_user.findOne({
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
                    model: show, 
                    as: 'show', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                ]
            });
            if (!showUser) {
                throw new Error('Show User not found');
            }
            return {
                ...showUser.dataValues,
                _id: showUser.id
            };
            } catch (err) {
            throw err;
            }
        },
        getShowUserByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getShowUserByQuery...");
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
                case 'show':
                    include.push({ 
                    model: show, 
                    as: 'show', 
                    foreignKey: 'show_id',
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

            const showUsers = await show_user.findAll({
                where: where,
                include: include
            });
            return showUsers.map(showUser => {
                return {
                ...showUser.dataValues,
                _id: showUser.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createShowUser: async (_, { showUserInput }, { req }) => {
            console.log("Resolver: createShowUser...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const showUser = await show_user.create({
                ...showUserInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...showUser.dataValues,
                _id: showUser.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateShowUser: async (_, { id, showUserInput }, { req }) => {
            console.log("Resolver: updateShowUser...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const showUser = await show_user.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!showUser) {
                throw new Error('Show User not found');
            }
            await showUser.update({
                ...showUserInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...showUser.dataValues,
                _id: showUser.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteShowUser: async (_, { id }, { req }) => {
            console.log("Resolver: deleteShowUser...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const showUser = await show_user.findOne({ where: { id: id } });
            if (!showUser) {
                throw new Error('Show User not found');
            }
            await showUser.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...showUser.dataValues,
                _id: showUser.id
            };
            } catch (err) {
            throw err;
            }
        },
    },
};