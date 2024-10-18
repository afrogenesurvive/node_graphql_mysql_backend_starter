const moment = require('moment-timezone');
const { venue_show, venue, show } = require('../../db/models');
const { Op } = require('sequelize');
const { Query } = require('./auth');

module.exports = {
    Query: {
        getAllVenueShows: async (_, {args}, { req }) => {
            console.log("Resolver: getAllVenueShows...");
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
                case 'venue':
                    include.push({ 
                    model: venue, 
                    as: 'venue', 
                    foreignKey: 'venue_id',
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

            const venueShows = await venue_show.findAll({
                where: where,
                include: include
            });
            return venueShows.map(venueShow => {
                return {
                ...venueShow.dataValues,
                _id: venueShow.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getVenueShow: async (_, { id }, { req }) => {
            console.log("Resolver: getVenueShowById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueShow = await venue_show.findOne({
                where: { 
                id: id,
                is_deleted: 'N' 
                },
                include: [
                { 
                    model: venue, 
                    as: 'venue', 
                    foreignKey: 'venue_id',
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
            if (!venueShow) {
                throw new Error('Venue Show not found');
            }
            return {
                ...venueShow.dataValues,
                _id: venueShow.id
            };
            } catch (err) {
            throw err;
            }
        },
        getVenueShowByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getVenueShowByQuery...");
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
                case 'venue':
                    include.push({ 
                    model: venue, 
                    as: 'venue', 
                    foreignKey: 'venue_id',
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

            const venueShows = await venue_show.findAll({
                where: where,
                include: include
            });
            return venueShows.map(venueShow => {
                return {
                ...venueShow.dataValues,
                _id: venueShow.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createVenueShow: async (_, { venueShowInput }, { req }) => {
            console.log("Resolver: createVenueShow...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueShow = await venue_show.create({
                ...venueShowInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...venueShow.dataValues,
                _id: venueShow.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateVenueShow: async (_, { id, venueShowInput }, { req }) => {
            console.log("Resolver: updateVenueShow...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueShow = await venue_show.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!venueShow) {
                throw new Error('Venue Show not found');
            }
            await venueShow.update({
                ...venueShowInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...venueShow.dataValues,
                _id: venueShow.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteVenueShow: async (_, { id }, { req }) => {
            console.log("Resolver: deleteVenueShow...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueShow = await venue_show.findOne({ where: { id: id } });
            if (!venueShow) {
                throw new Error('Venue Show not found');
            }
            await venueShow.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...venueShow.dataValues,
                _id: venueShow.id
            };
            } catch (err) {
            throw err;
            }
        },
    }
};