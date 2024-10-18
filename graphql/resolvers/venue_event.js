const moment = require('moment-timezone');
const { venue_event, venue, event, show } = require('../../db/models');
const { Op } = require('sequelize');
const { Query } = require('./user');

module.exports = {
    Query: {
        getAllVenueEvents: async (_, {args}, { req }) => {
            console.log("Resolver: getAllVenueEvents...");
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
                case 'event':
                    include.push({ 
                    model: event, 
                    as: 'event', 
                    foreignKey: 'event_id',
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

            const venueEvents = await venue_event.findAll({
                where: where,
                include: include
            });
            return venueEvents.map(venueEvent => {
                return {
                ...venueEvent.dataValues,
                _id: venueEvent.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getVenueEvent: async (_, { id }, { req }) => {
            console.log("Resolver: getVenueEventById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueEvent = await venue_event.findOne({
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
                    model: event, 
                    as: 'event', 
                    foreignKey: 'event_id',
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
            if (!venueEvent) {
                throw new Error('Venue Event not found');
            }
            return {
                ...venueEvent.dataValues,
                _id: venueEvent.id
            };
            } catch (err) {
            throw err;
            }
        },
        getVenueEventByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getVenueEventByQuery...");
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
                case 'event':
                    include.push({ 
                    model: event, 
                    as: 'event', 
                    foreignKey: 'event_id',
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

            const venueEvents = await venue_event.findAll({
                where: where,
                include: include
            });
            return venueEvents.map(venueEvent => {
                return {
                ...venueEvent.dataValues,
                _id: venueEvent.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createVenueEvent: async (_, { venueEventInput }, { req }) => {
            console.log("Resolver: createVenueEvent...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueEvent = await venue_event.create({
                ...venueEventInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...venueEvent.dataValues,
                _id: venueEvent.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateVenueEvent: async (_, { id, venueEventInput }, { req }) => {
            console.log("Resolver: updateVenueEvent...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueEvent = await venue_event.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!venueEvent) {
                throw new Error('Venue Event not found');
            }
            await venueEvent.update({
                ...venueEventInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...venueEvent.dataValues,
                _id: venueEvent.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteVenueEvent: async (_, { id }, { req }) => {
            console.log("Resolver: deleteVenueEvent...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venueEvent = await venue_event.findOne({ where: { id: id } });
            if (!venueEvent) {
                throw new Error('Venue Event not found');
            }
            await venueEvent.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...venueEvent.dataValues,
                _id: venueEvent.id
            };
            } catch (err) {
            throw err;
            }
        },
    }
};