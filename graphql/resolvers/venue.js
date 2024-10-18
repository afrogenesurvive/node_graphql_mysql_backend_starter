const moment = require('moment-timezone');
const { Venue, 
    contact, 
    venue_user, 
    venue_show, 
    venue_event, 
    review, 
    rating, 
    tag 
} = require('../../db/models');
const { Op } = require('sequelize');
const { Query } = require('./auth');

module.exports = {
    Query: {
        getAllVenues: async (_, {args}, { req }) => {
            console.log("Resolver: getAllVenues...");
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
                case 'venue_users':
                    include.push({ 
                    mode: venue_user, 
                    as: 'venue_users', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'venue_shows':
                    include.push({ 
                    model: venue_show, 
                    as: 'venue_shows', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'venue_events':
                    include.push({ 
                    model: venue_event, 
                    as: 'venue_events', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'reviews':
                    include.push({ 
                    model: review, 
                    as: 'reviews', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'ratings':
                    include.push({ 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'venue_id',
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

            const venues = await Venue.findAll({
                where: where,
                include: include
            });
            return venues.map(venue => {
                return {
                ...venue.dataValues,
                _id: venue.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getVenue: async (_, { id }, { req }) => {
            console.log("Resolver: getVenueById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venue_ = await Venue.findOne({
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
                    mode: venue_user, 
                    as: 'venue_users', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: venue_show, 
                    as: 'venue_shows', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: venue_event, 
                    as: 'venue_events', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: review, 
                    as: 'reviews', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'venue_id',
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
                }
                ]
            });
            if (!venue_) {
                throw new Error('Venue not found');
            }
            return {
                ...venue_.dataValues,
                _id: venue_.id
            };
            } catch (err) {
            throw err;
            }
        },
        getVenueByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getVenueByQuery...");
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
                case 'venue_users':
                    include.push({ 
                    mode: venue_user, 
                    as: 'venue_users', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'venue_shows':
                    include.push({ 
                    model: venue_show, 
                    as: 'venue_shows', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'venue_events':
                    include.push({ 
                    model: venue_event, 
                    as: 'venue_events', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'reviews':
                    include.push({ 
                    model: review, 
                    as: 'reviews', 
                    foreignKey: 'venue_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'ratings':
                    include.push({ 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'venue_id',
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

            const venues = await Venue.findAll({
                where: where,
                include: include
            });
            return venues.map(venue => {
                return {
                ...venue.dataValues,
                _id: venue.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createVenue: async (_, { venueInput }, { req }) => {
            console.log("Resolver: createVenue...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venue_ = await Venue.create({
                ...venueInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...venue_.dataValues,
                _id: venue_.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateVenue: async (_, { id, venueInput }, { req }) => {
            console.log("Resolver: updateVenue...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venue_ = await Venue.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!venue_) {
                throw new Error('Venue not found');
            }
            await venue_.update({
                ...venueInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...venue_.dataValues,
                _id: venue_.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteVenue: async (_, { id }, { req }) => {
            console.log("Resolver: deleteVenue...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const venue_ = await Venue.findOne({ where: { id: id } });
            if (!venue_) {
                throw new Error('Venue not found');
            }
            await venue_.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...venue_.dataValues,
                _id: venue_.id
            };
            } catch (err) {
            throw err;
            }
        },
    },
};