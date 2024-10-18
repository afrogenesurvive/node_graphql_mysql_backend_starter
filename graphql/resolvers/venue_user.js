const moment = require('moment-timezone');
const { venue_user, user, venue } = require('../../db/models');
const { Op } = require('sequelize');
const { Query } = require('./auth');

module.exports = {
    Query: {
        getAllVenueUsers: async (_, {args}, { req }) => {
            console.log("Resolver: getAllVenueUsers...");
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
                case 'venue':
                    include.push({ 
                    model: venue, 
                    as: 'venue', 
                    foreignKey: 'venue_id',
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

            const venueUsers = await venue_user.findAll({
                where: where,
                include: include
            });
            return venueUsers.map(venueUser => {
                return {
                ...venueUser.dataValues,
                _id: venueUser.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getVenueUser: async (_, { id }, { req }) => {
            console.log("Resolver: getVenueUserById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueUser = await venue_user.findOne({
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
                    model: venue, 
                    as: 'venue', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                ]
            });
            if (!venueUser) {
                throw new Error('Venue User not found');
            }
            return {
                ...venueUser.dataValues,
                _id: venueUser.id
            };
            } catch (err) {
            throw err;
            }
        },
        getVenueUserByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getVenueUserByQuery...");
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
                case 'venue':
                    include.push({ 
                    model: venue, 
                    as: 'venue', 
                    foreignKey: 'venue_id',
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

            const venueUsers = await venue_user.findAll({
                where: where,
                include: include
            });
            return venueUsers.map(venueUser => {
                return {
                ...venueUser.dataValues,
                _id: venueUser.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createVenueUser: async (_, { venueUserInput }, { req }) => {
            console.log("Resolver: createVenueUser...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueUser = await venue_user.create({
                ...venueUserInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...venueUser.dataValues,
                _id: venueUser.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateVenueUser: async (_, { id, venueUserInput }, { req }) => {
            console.log("Resolver: updateVenueUser...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueUser = await venue_user.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!venueUser) {
                throw new Error('Venue User not found');
            }
            await venueUser.update({
                ...venueUserInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...venueUser.dataValues,
                _id: venueUser.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteVenueUser: async (_, { id }, { req }) => {
            console.log("Resolver: deleteVenueUser...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueUser = await venue_user.findOne({ where: { id: id } });
            if (!venueUser) {
                throw new Error('Venue User not found');
            }
            await venueUser.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...venueUser.dataValues,
                _id: venueUser.id
            };
            } catch (err) {
            throw err;
            }
        },
    },
};