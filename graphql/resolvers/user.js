const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const { user, contact, user_permission } = require('../../db/models'); 
const { is } = require('express/lib/request');
const { Query } = require('./auth');

module.exports = {
  Query: {
    getAllUsers: async (_, {args}, { req }) => {
      console.log("Resolver: getAllUsers...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {

        const query = JSON.parse(args);
        let include = [];
        let where_like = [];
        let where = { is_deleted: 'N' };

        query.includes.forEach(incl=> {
          switch (incl) {
            case 'contact':
              include.push({ 
                model: contact, 
                as: 'contact', 
                foreignKey: 'entity_id' ,
                where: { is_deleted: 'N'},
                required: false,
              });
              break;
            case 'user_permissions':
              include.push({ 
                model: user_permission, 
                as: 'user_permissions', 
                foreignKey: 'user_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'show_users':
              include.push({ 
                model: show_user, 
                as: 'show_users', 
                foreignKey: 'user_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'venue_users':
              include.push({ 
                model: venue_user, 
                as: 'venue_users', 
                foreignKey: 'user_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'reviews':
              include.push({ 
                model: review, 
                as: 'reviews', 
                foreignKey: 'user_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'ratings':
              include.push({ 
                model: rating, 
                as: 'ratings', 
                foreignKey: 'user_id',
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
            case 'likes':
              include.push({ 
              model: like, 
              as: 'likes', 
              foreignKey: 'entity_id', 
              where: { is_deleted: 'N' }, 
              required: false 
              });
              break;
            case 'watchlists':
              include.push({ 
                model: watchlist, 
                as: 'watchlists', 
                foreignKey: 'user_id',
                where: { is_deleted: 'N' },
                required: false,
                include: [{
                  model: watchlist_item, 
                  as: 'watchlist_items', 
                  foreignKey: 'watchlist_id',
                  where: { is_deleted: 'N' },
                  required: false,
                }]
              });
              break
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

        where[Op.or] = where_like

        const users = await user.findAll({
          where: where,
          include: include 
        });
        return users.map(user => {
          return {
            ...user.dataValues,
            _id: user.id
          };
        });
      } catch (err) {
        throw err;
      }
    },
    getUser: async (_, { id }, { req }) => {
      console.log("Resolver: getUserById...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const user_ = await user.find({
          where: { 
            id: id,
            is_deleted: 'N' 
          },
          include: [
            { 
              model: contact, 
              as: 'contact', 
              foreignKey: 'entity_id' ,
              where: { is_deleted: 'N'},
              required: false,
            },
            { 
              model: user_permission, 
              as: 'user_permissions', 
              foreignKey: 'user_id',
              where: { is_deleted: 'N' },
              required: false,
            },
            { 
              model: show_user, 
              as: 'show_users', 
              foreignKey: 'user_id',
              where: { is_deleted: 'N' },
              required: false,
            },
            { 
              model: venue_user, 
              as: 'venue_users', 
              foreignKey: 'user_id',
              where: { is_deleted: 'N' },
              required: false,
            },
            { 
              model: review, 
              as: 'reviews', 
              foreignKey: 'user_id',
              where: { is_deleted: 'N' },
              required: false,
            },
            { 
              model: rating, 
              as: 'ratings', 
              foreignKey: 'user_id',
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
              model: watchlist, 
              as: 'watchlists', 
              foreignKey: 'user_id',
              where: { is_deleted: 'N' },
              required: false,
              include: [{
                model: watchlist_item, 
                as: 'watchlist_items', 
                foreignKey: 'watchlist_id',
                where: { is_deleted: 'N' },
                required: false,
              }]
            }
          ]
        });
        if (!user_) {
          throw new Error('User not found');
        }
        return {
          ...user_.dataValues,
          _id: user_.id
        };
      } catch (err) {
        throw err;
      }
    },
    getUserByQuery: async (_, {args}, { req }) => {
      console.log("Resolver: getUserByQuery...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {

        const query = JSON.parse(args);
        let include = [];
        let where_like = [];
        let where = { is_deleted: 'N' };

        query.includes.forEach(incl=> {
          switch (incl) {
            case 'contact':
              include.push({ 
                model: contact, 
                as: 'contact', 
                foreignKey: 'entity_id' ,
                where: { is_deleted: 'N'},
                required: false,
              });
              break;
            case 'user_permissions':
              include.push({ 
                model: user_permission, 
                as: 'user_permissions', 
                foreignKey: 'user_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'show_users':
              include.push({ 
                model: show_user, 
                as: 'show_users', 
                foreignKey: 'user_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'venue_users':
              include.push({ 
                model: venue_user, 
                as: 'venue_users', 
                foreignKey: 'user_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'reviews':
              include.push({ 
                model: review, 
                as: 'reviews', 
                foreignKey: 'user_id',
                where: { is_deleted: 'N' },
                required: false,
              });
              break;
            case 'ratings':
              include.push({ 
                model: rating, 
                as: 'ratings', 
                foreignKey: 'user_id',
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
              break
            case 'likes':
              include.push({ 
                model: like, 
                as: 'likes', 
                foreignKey: 'entity_id', 
                where: { is_deleted: 'N' }, 
                required: false 
              });
              break;
            case 'watchlists':
              include.push({ 
                model: watchlist, 
                as: 'watchlists', 
                foreignKey: 'user_id',
                where: { is_deleted: 'N' },
                required: false,
                include: [{
                  model: watchlist_item, 
                  as: 'watchlist_items', 
                  foreignKey: 'watchlist_id',
                  where: { is_deleted: 'N' },
                  required: false,
                }]
              });
              break
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

        where[Op.or] = where_like
        
        const users = await user.findAll({
          where: where,
          include: include
        });
        return users.map(user => {
          return {
            ...user.dataValues,
            _id: user.id
          };
        });
      } catch (err) {
        throw err;
      }
    },
  },
  RootMutation: {
    createUser: async (_, { userInput }, { req }) => {
      console.log("Resolver: createUser...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const hashedPassword = await bcrypt.hash(userInput.password, 12);
        const user_ = await user.create({
          ...userInput,
          password: hashedPassword,
          create_time: moment().format(),
          created_by: req.userId,
          is_deleted: 'N'
        });
        return {
          ...user_.dataValues,
          _id: user_.id
        };
      } catch (err) {
        throw err;
      }
    },
    updateUser: async (_, { id, userInput }, { req }) => {
      console.log("Resolver: updateUser...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const user_ = await user.find({
          where: { 
            id: id,
            is_deleted: 'N'
          }
        });
        if (!user_) {
          throw new Error('User not found');
        }
        await user_.update({
          ...userInput,
          update_time: moment().format(),
          updated_by: req.userId,
        });
        return {
          ...user_.dataValues,
          _id: user_.id
        };
      } catch (err) {
        throw err;
      }
    },
    deleteUser: async (_, { id }, { req }) => {
      console.log("Resolver: deleteUser...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const user_ = await user.findOne({where: {id: id}});``
        if (!user_) {
          throw new Error('User not found');
        }
        await user_.updateAttribute({
          is_deleted: 'Y',
          update_time: moment().format(),
          updated_by: req.userId,
        });
        return {
          ...user_.dataValues,
          _id: user_.id
        };
      } catch (err) {
        throw err;
      }
    },
  },
};