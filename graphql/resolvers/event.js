const { Op } = require('sequelize');
const moment = require('moment-timezone');
const { 
  event, 
  contact, 
  venue_event, 
  review, 
  rating, 
  tag 
} = require('../../db/models'); 
const { Query } = require('./auth');

module.exports = {
    Query: {
        getAllEvents: async (_, {args}, { req }) => {
            console.log("Resolver: getAllEvents...");
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
                    required: false 
                    });
                    break;
                case 'venue_events':
                    include.push({ 
                    model: venue_event, 
                    as: 'venue_events', 
                    foreignKey: 'event_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                    });
                    break;
                case 'reviews':
                    include.push({ 
                    model: review, 
                    as: 'reviews', 
                    foreignKey: 'event_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                    });
                    break;
                case 'ratings':
                    include.push({ 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'event_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                    });
                    break;
                case 'tags':
                    include.push({ 
                    model: tag, 
                    as: 'tags', 
                    foreignKey: 'entity_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
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
                where_like.push({[whl.key]: { [Op.like]: `%${wh.value}%` }});
            });

            query.where.forEach(wh => {
                where[wh.key] = wh.value;
            });

            where[Op.or] = where_like;

            const events = await Event.findAll({
                where: where,
                include: include
            });
            return events.map(event => {
                return {
                ...event.dataValues,
                _id: event.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getEvent: async (_, { id }, { req }) => {
            console.log("Resolver: getEventById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const event_ = await Event.findOne({
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
                    required: false 
                },
                { 
                    model: venue_event, 
                    as: 'venue_events', 
                    foreignKey: 'event_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                },
                { 
                    model: review, 
                    as: 'reviews', 
                    foreignKey: 'event_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                },
                { 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'event_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                },
                { 
                    model: tag, 
                    as: 'tags', 
                    foreignKey: 'entity_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
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
            if (!event_) {
                throw new Error('Event not found');
            }
            return {
                ...event_.dataValues,
                _id: event_.id
            };
            } catch (err) {
            throw err;
            }
        },
        getEventByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getEventByQuery...");
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
                    required: false 
                    });
                    break;
                case 'venue_events':
                    include.push({ 
                    model: venue_event, 
                    as: 'venue_events', 
                    foreignKey: 'event_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                    });
                    break;
                case 'reviews':
                    include.push({ 
                    model: review, 
                    as: 'reviews', 
                    foreignKey: 'event_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                    });
                    break;
                case 'ratings':
                    include.push({ 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'event_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
                    });
                    break;
                case 'tags':
                    include.push({ 
                    model: tag, 
                    as: 'tags', 
                    foreignKey: 'entity_id', 
                    where: { is_deleted: 'N' }, 
                    required: false 
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
                where_like.push({[whl.key]: { [Op.like]: `%${wh.value}%` }});
            });

            query.where.forEach(wh => {
                where[wh.key] = wh.value;
            });

            where[Op.or] = where_like;

            const events = await Event.findAll({
                where: where,
                include: include
            });
            return events.map(event => {
                return {
                ...event.dataValues,
                _id: event.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createEvent: async (_, { eventInput }, { req }) => {
            console.log("Resolver: createEvent...");
            if (!req.isAuth) {
                throw new Error('Unauthenticated!');
            }
            try {
            const event_ = await Event.create({
                ...eventInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...event_.dataValues,
                _id: event_.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateEvent: async (_, { id, eventInput }, { req }) => {
            console.log("Resolver: updateEvent...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const event_ = await Event.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!event_) {
                throw new Error('Event not found');
            }
            await event_.update({
                ...eventInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...event_.dataValues,
                _id: event_.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteEvent: async (_, { id }, { req }) => {
            console.log("Resolver: deleteEvent...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const event_ = await Event.findByPk(id);
            if (!event_) {
                throw new Error('Event not found');
            }
            await event_.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...event_.dataValues,
                _id: event_.id
            };
            } catch (err) {
            throw err;
            }
        },
    }
};