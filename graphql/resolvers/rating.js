const moment = require('moment-timezone');
const { rating, user, show, venue, event, review, tag } = require('../../db/models');
const { Op } = require('sequelize');
const { Query } = require('./auth');

module.exports = {
    Query: {
        getAllRatings: async (_, {args}, { req }) => {
            console.log("Resolver: getAllRatings...");
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
                case 'review':
                    include.push({ 
                    model: review, 
                    as: 'review', 
                    foreignKey: 'review_id',
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

            const ratings = await rating.findAll({
                where: where,
                include: include
            });
            return ratings.map(rating => {
                return {
                ...rating.dataValues,
                _id: rating.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getRating: async (_, { id }, { req }) => {
            console.log("Resolver: getRatingById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const rating_ = await rating.findOne({
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
                    model: review, 
                    as: 'review', 
                    foreignKey: 'review_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                ]
            });
            if (!rating_) {
                throw new Error('Rating not found');
            }
            return {
                ...rating_.dataValues,
                _id: rating_.id
            };
            } catch (err) {
            throw err;
            }
        },
        getRatingByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getRatingByQuery...");
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
                case 'review':
                    include.push({ 
                    model: review, 
                    as: 'review', 
                    foreignKey: 'review_id',
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

            const ratings = await rating.findAll({
                where: where,
                include: include
            });
            return ratings.map(rating => {
                return {
                ...rating.dataValues,
                _id: rating.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createRating: async (_, { ratingInput }, { req }) => {
            console.log("Resolver: createRating...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const rating_ = await rating.create({
                ...ratingInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...rating_.dataValues,
                _id: rating_.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateRating: async (_, { id, ratingInput }, { req }) => {
            console.log("Resolver: updateRating...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const rating_ = await rating.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!rating_) {
                throw new Error('Rating not found');
            }
            await rating_.update({
                ...ratingInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...rating_.dataValues,
                _id: rating_.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteRating: async (_, { id }, { req }) => {
            console.log("Resolver: deleteRating...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const rating_ = await rating.findOne({ where: { id: id } });
            if (!rating_) {
                throw new Error('Rating not found');
            }
            await rating_.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...rating_.dataValues,
                _id: rating_.id
            };
            } catch (err) {
            throw err;
            }
        },
    }
};