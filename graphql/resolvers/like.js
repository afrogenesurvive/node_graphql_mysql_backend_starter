const moment = require('moment-timezone');
const { like, user, production_company, venue, show, event, review, watchlist } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  Query: {
    getAllLikes: async (_, { args }, { req }) => {
      console.log("Resolver: getAllLikes...");
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

        const likes = await like.findAll({
          where: where,
          include: include
        });
        return likes.map(like => {
          return {
            ...like.dataValues,
            _id: like.id
          };
        });
      } catch (err) {
        throw err;
      }
    },
    getLike: async (_, { id }, { req }) => {
      console.log("Resolver: getLikeById...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const like_ = await like.findOne({
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
        if (!like_) {
          throw new Error('Like not found');
        }
        return {
          ...like_.dataValues,
          _id: like_.id
        };
      } catch (err) {
        throw err;
      }
    },
    getLikeByQuery: async (_, { args }, { req }) => {
      console.log("Resolver: getLikeByQuery...");
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

        const likes = await like.findAll({
          where: where,
          include: include
        });
        return likes.map(like => {
          return {
            ...like.dataValues,
            _id: like.id
          };
        });
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    createLike: async (_, { likeInput }, { req }) => {
      console.log("Resolver: createLike...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const like_ = await like.create({
          ...likeInput,
          create_time: moment().format(),
          created_by: req.userId,
          is_deleted: 'N'
        });
        return {
          ...like_.dataValues,
          _id: like_.id
        };
      } catch (err) {
        throw err;
      }
    },
    updateLike: async (_, { id, likeInput }, { req }) => {
      console.log("Resolver: updateLike...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const like_ = await like.findOne({
          where: { 
            id: id,
            is_deleted: 'N'
          }
        });
        if (!like_) {
          throw new Error('Like not found');
        }
        await like_.update({
          ...likeInput,
          update_time: moment().format(),
          updated_by: req.userId,
        });
        return {
          ...like_.dataValues,
          _id: like_.id
        };
      } catch (err) {
        throw err;
      }
    },
    deleteLike: async (_, { id }, { req }) => {
      console.log("Resolver: deleteLike...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const like_ = await like.findOne({ where: { id: id } });
        if (!like_) {
          throw new Error('Like not found');
        }
        await like_.update({
          is_deleted: 'Y',
          update_time: moment().format(),
          updated_by: req.userId,
        });
        return {
          ...like_.dataValues,
          _id: like_.id
        };
      } catch (err) {
        throw err;
      }
    },
  },
};