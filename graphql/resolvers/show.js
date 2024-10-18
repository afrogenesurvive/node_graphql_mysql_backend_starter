const moment = require('moment-timezone');
const { 
    show, 
    production_company, 
    show_user, 
    venue_show, 
    venue_event, 
    review, 
    rating, 
    tag, 
    contact 
} = require('../../db/models');
const { Op } = require('sequelize');
const { Query } = require('./auth');

module.exports = {
    Query: {
        getAllShows: async (_, {args}, { req }) => {
            console.log("Resolver: getAllShows...");
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
                case 'production_company':
                    include.push({ 
                    model: production_company, 
                    as: 'production_company', 
                    foreignKey: 'production_company_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'show_users':
                    include.push({ 
                    model: show_user, 
                    as: 'show_users', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'venue_shows':
                    include.push({ 
                    model: venue_show, 
                    as: 'venue_shows', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'venue_events':
                    include.push({ 
                    model: venue_event, 
                    as: 'venue_events', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'reviews':
                    include.push({ 
                    model: review, 
                    as: 'reviews', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'ratings':
                    include.push({ 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'show_id',
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
                case 'contacts':
                    include.push({ 
                    model: contact, 
                    as: 'contacts', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'watchlist_items':
                    include.push({ 
                    model: watchlist_item, 
                    as: 'watchlist_items', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    include: [{
                        model: watchlist, 
                        as: 'watchlist', 
                        foreignKey: 'watchlist_id',
                        where: { is_deleted: 'N' },
                        required: false,
                    }]
                    });
                    break;
                default:
                    break;
                }
            });

            query.where_like.forEach(whl => {
                switch (whl.key) {
                case 'title':
                    where_like.push({ title: { [Op.like]: `%${whl.value}%` } });
                    break;
                case 'description':
                    where_like.push({ description: { [Op.like]: `%${whl.value}%` } });
                    break;
                default:
                    break;
                }
            });

            query.where.forEach(wh => {
                switch (wh.key) {
                case 'title':
                    where.title = wh.value;
                    break;
                case 'description':
                    where.description = wh.value;
                    break;
                default:
                    break;
                }
            });

            where[Op.or] = where_like;

            const shows = await Show.findAll({
                where: where,
                include: include
            });
            return shows.map(show => {
                return {
                ...show.dataValues,
                _id: show.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
        getShow: async (_, { id }, { req }) => {
            console.log("Resolver: getShowById...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const show_ = await Show.findOne({
                where: { 
                id: id,
                is_deleted: 'N' 
                },
                include: [
                { 
                    model: production_company, 
                    as: 'production_company', 
                    foreignKey: 'production_company_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: show_user, 
                    as: 'show_users', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: venue_show, 
                    as: 'venue_shows', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: venue_event, 
                    as: 'venue_events', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: review, 
                    as: 'reviews', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'show_id',
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
                },
                { 
                    model: contact, 
                    as: 'contacts', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                },
                { 
                    model: watchlist_item, 
                    as: 'watchlist_items', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    include: [{
                        model: watchlist, 
                        as: 'watchlist', 
                        foreignKey: 'watchlist_id',
                        where: { is_deleted: 'N' },
                        required: false,
                    }]
                }
                ]
            });
            if (!show_) {
                throw new Error('Show not found');
            }
            return {
                ...show_.dataValues,
                _id: show_.id
            };
            } catch (err) {
            throw err;
            }
        },
        getShowByQuery: async (_, {args}, { req }) => {
            console.log("Resolver: getShowByQuery...");
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
                case 'production_company':
                    include.push({ 
                    model: production_company, 
                    as: 'production_company', 
                    foreignKey: 'production_company_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'show_users':
                    include.push({ 
                    model: show_user, 
                    as: 'show_users', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'venue_shows':
                    include.push({ 
                    model: venue_show, 
                    as: 'venue_shows', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'venue_events':
                    include.push({ 
                    model: venue_event, 
                    as: 'venue_events', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'reviews':
                    include.push({ 
                    model: review, 
                    as: 'reviews', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'ratings':
                    include.push({ 
                    model: rating, 
                    as: 'ratings', 
                    foreignKey: 'show_id',
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
                case 'contacts':
                    include.push({ 
                    model: contact, 
                    as: 'contacts', 
                    foreignKey: 'entity_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    });
                    break;
                case 'watchlist_items':
                    include.push({ 
                    model: watchlist_item, 
                    as: 'watchlist_items', 
                    foreignKey: 'show_id',
                    where: { is_deleted: 'N' },
                    required: false,
                    include: [{
                        model: watchlist, 
                        as: 'watchlist', 
                        foreignKey: 'watchlist_id',
                        where: { is_deleted: 'N' },
                        required: false,
                    }]
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

            const shows = await Show.findAll({
                where: where,
                include: include
            });
            return shows.map(show => {
                return {
                ...show.dataValues,
                _id: show.id
                };
            });
            } catch (err) {
            throw err;
            }
        },
    },
    RootMutation: {
        createShow: async (_, { showInput }, { req }) => {
            console.log("Resolver: createShow...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const show_ = await Show.create({
                ...showInput,
                create_time: moment().format(),
                created_by: req.userId,
                is_deleted: 'N'
            });
            return {
                ...show_.dataValues,
                _id: show_.id
            };
            } catch (err) {
            throw err;
            }
        },
        updateShow: async (_, { id, showInput }, { req }) => {
            console.log("Resolver: updateShow...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const show_ = await Show.findOne({
                where: { 
                id: id,
                is_deleted: 'N'
                }
            });
            if (!show_) {
                throw new Error('Show not found');
            }
            await show_.update({
                ...showInput,
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...show_.dataValues,
                _id: show_.id
            };
            } catch (err) {
            throw err;
            }
        },
        deleteShow: async (_, { id }, { req }) => {
            console.log("Resolver: deleteShow...");
            if (!req.isAuth) {
            throw new Error('Unauthenticated!');
            }
            try {
            const show_ = await Show.findOne({ where: { id: id } });
            if (!show_) {
                throw new Error('Show not found');
            }
            await show_.update({
                is_deleted: 'Y',
                update_time: moment().format(),
                updated_by: req.userId,
            });
            return {
                ...show_.dataValues,
                _id: show_.id
            };
            } catch (err) {
            throw err;
            }
        },
    },
};