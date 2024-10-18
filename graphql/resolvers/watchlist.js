const moment = require('moment-timezone');
const { watchlist, user, watchlist_item, tag, like } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  Query: {
    getAllWatchlists: async (_, { args }, { req }) => {
      console.log("Resolver: getAllWatchlists...");
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
            case 'watchlist_item':
              include.push({ 
                model: watchlist_item, 
                as: 'watchlist_items', 
                foreignKey: 'watchlist_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'tag':
              include.push({ 
                model: tag, 
                as: 'tags', 
                foreignKey: 'entity_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'like':
              include.push({ 
                model: like, 
                as: 'likes', 
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

        const watchlists = await watchlist.findAll({
          where: where,
          include: include
        });
        return watchlists.map(watchlist => {
          return {
            ...watchlist.dataValues,
            _id: watchlist.id
          };
        });
      } catch (err) {
        throw err;
      }
    },
    getWatchlist: async (_, { id }, { req }) => {
      console.log("Resolver: getWatchlistById...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const watchlist_ = await watchlist.findOne({
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
              model: watchlist_item, 
              as: 'watchlist_items', 
              foreignKey: 'watchlist_id',
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
              required: false,
            },
          ]
        });
        if (!watchlist_) {
          throw new Error('Watchlist not found');
        }
        return {
          ...watchlist_.dataValues,
          _id: watchlist_.id
        };
      } catch (err) {
        throw err;
      }
    },
    getWatchlistByQuery: async (_, { args }, { req }) => {
      console.log("Resolver: getWatchlistByQuery...");
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
            case 'watchlist_item':
              include.push({ 
                model: watchlist_item, 
                as: 'watchlist_items', 
                foreignKey: 'watchlist_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'tag':
              include.push({ 
                model: tag, 
                as: 'tags', 
                foreignKey: 'entity_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'like':
              include.push({ 
                model: like, 
                as: 'likes', 
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

        const watchlists = await watchlist.findAll({
          where: where,
          include: include
        });
        return watchlists.map(watchlist => {
          return {
            ...watchlist.dataValues,
            _id: watchlist.id
          };
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createWatchlist: async (_, { watchlistInput }, { req }) => {
      console.log("Resolver: createWatchlist...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const watchlist_ = await watchlist.create({
          ...watchlistInput,
          create_time: moment().format(),
          created_by: req.userId,
          is_deleted: 'N'
        });
        return {
          ...watchlist_.dataValues,
          _id: watchlist_.id
        };
      } catch (err) {
        throw err;
      }
    },
    updateWatchlist: async (_, { id, watchlistInput }, { req }) => {
      console.log("Resolver: updateWatchlist...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const watchlist_ = await watchlist.findOne({
          where: { 
            id: id,
            is_deleted: 'N'
          }
        });
        if (!watchlist_) {
          throw new Error('Watchlist not found');
        }
        await watchlist_.update({
          ...watchlistInput,
          update_time: moment().format(),
          updated_by: req.userId,
        });
        return {
          ...watchlist_.dataValues,
          _id: watchlist_.id
        };
      } catch (err) {
        throw err;
      }
    },
    deleteWatchlist: async (_, { id }, { req }) => {
      console.log("Resolver: deleteWatchlist...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const watchlist_ = await watchlist.findOne({ where: { id: id } });
        if (!watchlist_) {
          throw new Error('Watchlist not found');
        }
        await watchlist_.update({
          is_deleted: 'Y',
          update_time: moment().format(),
          updated_by: req.userId,
        });
        return {
          ...watchlist_.dataValues,
          _id: watchlist_.id
        };
      } catch (err) {
        throw err;
      }
    },
  },
};