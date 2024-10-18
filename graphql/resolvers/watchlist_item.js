const moment = require('moment-timezone');
const { watchlist_item, watchlist, show } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  Query: {
    getAllWatchlistItems: async (_, { args }, { req }) => {
      console.log("Resolver: getAllWatchlistItems...");
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
            case 'watchlist':
              include.push({ 
                model: watchlist, 
                as: 'watchlist', 
                foreignKey: 'watchlist_id',
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

        const watchlist_items = await watchlist_item.findAll({
          where: where,
          include: include
        });
        return watchlist_items.map(watchlist_item => {
          return {
            ...watchlist_item.dataValues,
            _id: watchlist_item.id
          };
        });
      } catch (err) {
        throw err;
      }
    },
    getWatchlistItem: async (_, { id }, { req }) => {
      console.log("Resolver: getWatchlistItemById...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const watchlist_item_ = await watchlist_item.findOne({
          where: { 
            id: id,
            is_deleted: 'N' 
          },
          include: [
            { 
              model: watchlist, 
              as: 'watchlist', 
              foreignKey: 'watchlist_id',
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
        if (!watchlist_item_) {
          throw new Error('Watchlist item not found');
        }
        return {
          ...watchlist_item_.dataValues,
          _id: watchlist_item_.id
        };
      } catch (err) {
        throw err;
      }
    },
    getWatchlistItemByQuery: async (_, { args }, { req }) => {
      console.log("Resolver: getWatchlistItemByQuery...");
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
            case 'watchlist':
              include.push({ 
                model: watchlist, 
                as: 'watchlist', 
                foreignKey: 'watchlist_id',
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

        const watchlist_items = await watchlist_item.findAll({
          where: where,
          include: include
        });
        return watchlist_items.map(watchlist_item => {
          return {
            ...watchlist_item.dataValues,
            _id: watchlist_item.id
          };
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createWatchlistItem: async (_, { watchlistItemInput }, { req }) => {
      console.log("Resolver: createWatchlistItem...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const watchlist_item_ = await watchlist_item.create({
          ...watchlistItemInput,
          create_time: moment().format(),
          created_by: req.userId,
          is_deleted: 'N'
        });
        return {
          ...watchlist_item_.dataValues,
          _id: watchlist_item_.id
        };
      } catch (err) {
        throw err;
      }
    },
    updateWatchlistItem: async (_, { id, watchlistItemInput }, { req }) => {
      console.log("Resolver: updateWatchlistItem...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const watchlist_item_ = await watchlist_item.findOne({
          where: { 
            id: id,
            is_deleted: 'N'
          }
        });
        if (!watchlist_item_) {
          throw new Error('Watchlist item not found');
        }
        await watchlist_item_.update({
          ...watchlistItemInput,
          update_time: moment().format(),
          updated_by: req.userId,
        });
        return {
          ...watchlist_item_.dataValues,
          _id: watchlist_item_.id
        };
      } catch (err) {
        throw err;
      }
    },
    deleteWatchlistItem: async (_, { id }, { req }) => {
      console.log("Resolver: deleteWatchlistItem...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const watchlist_item_ = await watchlist_item.findOne({ where: { id: id } });
        if (!watchlist_item_) {
          throw new Error('Watchlist item not found');
        }
        await watchlist_item_.update({
          is_deleted: 'Y',
          update_time: moment().format(),
          updated_by: req.userId,
        });
        return {
          ...watchlist_item_.dataValues,
          _id: watchlist_item_.id
        };
      } catch (err) {
        throw err;
      }
    },
  },
};