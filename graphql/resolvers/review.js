const moment = require('moment-timezone');
const { review, user, show, venue, event, rating, tag } = require('../../db/models');
const { Op } = require('sequelize');
const { Query } = require('./auth');

module.exports = {
    Query: {
        getAllReviews: async (_, {args}, { req }) => {
            console.log("Resolver: getAllReviews...");
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
                case 'ratings':
                    include.push({ 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'review_id',
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

            const reviews = await review.findAll({
                where: where,
                include: include
            });
            return reviews.map(review => {
                return {
                ...review.dataValues,
                _id: review.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getReview: async (_, { id }, { req }) => {
            console.log("Resolver: getReviewById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const review_ = await review.findOne({
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
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'review_id',
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
            if (!review_) {
                throw new Error('Review not found');
            }
            return {
                ...review_.dataValues,
                _id: review_.id
            };
            } catch (err) {
            throw err;
            }
        },
        getReviewByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getReviewByQuery...");
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
                case 'ratings':
                    include.push({ 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'review_id',
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

            const reviews = await review.findAll({
                where: where,
                include: include
            });
            return reviews.map(review => {
                return {
                ...review.dataValues,
                _id: review.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createReview: async (_, { reviewInput }, { req }) => {
            console.log("Resolver: createReview...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const review_ = await review.create({
                ...reviewInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...review_.dataValues,
                _id: review_.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateReview: async (_, { id, reviewInput }, { req }) => {
            console.log("Resolver: updateReview...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const review_ = await review.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!review_) {
                throw new Error('Review not found');
            }
            await review_.update({
                ...reviewInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...review_.dataValues,
                _id: review_.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteReview: async (_, { id }, { req }) => {
            console.log("Resolver: deleteReview...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const review_ = await review.findOne({ where: { id: id } });
            if (!review_) {
                throw new Error('Review not found');
            }
            await review_.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...review_.dataValues,
                _id: review_.id
            };
            } catch (err) {
            throw err;
            }
        },
    },
};