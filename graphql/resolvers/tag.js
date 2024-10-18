const moment = require('moment-timezone');
const { tag, user, production_company, venue, show, event, review } = require('../../db/models');
const { Op } = require('sequelize');
const { Query, RootMutation } = require('./auth');

module.exports = {
    Query: {
        getAllTags: async (_, {args}, { req }) => {
            console.log("Resolver: getAllTags...");
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
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'production_company':
                    include.push({ 
                    model: production_company, 
                    as: 'production_company', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'venue':
                    include.push({ 
                    model: venue, 
                    as: 'venue', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'show':
                    include.push({ 
                    model: show, 
                    as: 'show', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'event':
                    include.push({ 
                    model: event, 
                    as: 'event', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'review':
                    include.push({ 
                    model: review, 
                    as: 'review', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'watchlist':
                    include.push({ 
                    model: review, 
                    as: 'watchlist', 
                    foreignKey: 'entity_id',
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

            const tags = await tag.findAll({
                where: where,
                include: include
            });
            return tags.map(tag => {
                return {
                ...tag.dataValues,
                _id: tag.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getTag: async (_, { id }, { req }) => {
            console.log("Resolver: getTagById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const tag_ = await tag.findOne({
                where: { 
                id: id,
                is_deleted: 'N' 
                },
                include: [
                { 
                    model: user, 
                    as: 'user', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: production_company, 
                    as: 'production_company', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: venue, 
                    as: 'venue', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: show, 
                    as: 'show', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: event, 
                    as: 'event', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: review, 
                    as: 'review', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: watchlist, 
                    as: 'watchlist', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                ]
            });
            if (!tag_) {
                throw new Error('Tag not found');
            }
            return {
                ...tag_.dataValues,
                _id: tag_.id
            };
            } catch (err) {
            throw err;
            }
        },
        getTagByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getTagByQuery...");
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
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'production_company':
                    include.push({ 
                    model: production_company, 
                    as: 'production_company', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'venue':
                    include.push({ 
                    model: venue, 
                    as: 'venue', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'show':
                    include.push({ 
                    model: show, 
                    as: 'show', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'event':
                    include.push({ 
                    model: event, 
                    as: 'event', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'review':
                    include.push({ 
                    model: review, 
                    as: 'review', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                case 'watchlist':
                    include.push({ 
                    model: watchlist, 
                    as: 'watchlist', 
                    foreignKey: 'entity_id',
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

            const tags = await tag.findAll({
                where: where,
                include: include
            });
            return tags.map(tag => {
                return {
                ...tag.dataValues,
                _id: tag.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createTag: async (_, { tagInput }, { req }) => {
            console.log("Resolver: createTag...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const tag_ = await tag.create({
                ...tagInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...tag_.dataValues,
                _id: tag_.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateTag: async (_, { id, tagInput }, { req }) => {
            console.log("Resolver: updateTag...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const tag_ = await tag.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!tag_) {
                throw new Error('Tag not found');
            }
            await tag_.update({
                ...tagInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...tag_.dataValues,
                _id: tag_.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteTag: async (_, { id }, { req }) => {
            console.log("Resolver: deleteTag...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const tag_ = await tag.findOne({ where: { id: id } });
            if (!tag_) {
                throw new Error('Tag not found');
            }
            await tag_.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...tag_.dataValues,
                _id: tag_.id
            };
            } catch (err) {
            throw err;
            }
        },
    },
};