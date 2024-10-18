const { Op } = require('sequelize');
const moment = require('moment-timezone');
const { 
  contact, 
  user, 
  production_company, 
  venue, 
  event, 
  show 
} = require('../../db/models'); 

module.exports = {
Query: {
  getAllContacts: async (_, {args}, { req }) => {
    console.log("Resolver: getAllContacts...");
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
              required: false 
            });
            break;
          case 'production_company':
            include.push({ 
              model: production_company, 
              as: 'production_company', 
              foreignKey: 'entity_id', 
              where: { is_deleted: 'N' }, 
              required: false 
            });
            break;
          case 'venue':
            include.push({ 
              model: venue, 
              as: 'venue', 
              foreignKey: 'entity_id', 
              where: { is_deleted: 'N' }, 
              required: false 
            });
            break;
          case 'event':
            include.push({ 
              model: event, 
              as: 'event', 
              foreignKey: 'entity_id', 
              where: { is_deleted: 'N' }, 
              required: false 
            });
            break;
          case 'show':
            include.push({ 
              model: show, 
              as: 'show', 
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

      const contacts = await Contact.findAll({
        where: where,
        include: include
      });
      return contacts.map(contact => {
        return {
          ...contact.dataValues,
          _id: contact.id
        };
      });
    } catch (err) {
      throw err;
    }
  },
  getContact: async (_, { id }, { req }) => {
    console.log("Resolver: getContactById...");
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contact_ = await Contact.findOne({
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
            required: false 
          },
          { 
            model: production_company, 
            as: 'production_company', 
            foreignKey: 'entity_id', 
            where: { is_deleted: 'N' }, 
            required: false 
          },
          { 
            model: venue, 
            as: 'venue', 
            foreignKey: 'entity_id', 
            where: { is_deleted: 'N' }, 
            required: false 
          },
          { 
            model: event, 
            as: 'event', 
            foreignKey: 'entity_id', 
            where: { is_deleted: 'N' }, 
            required: false 
          },
          { 
            model: Show, 
            as: 'show', 
            foreignKey: 'entity_id', 
            where: { is_deleted: 'N' }, 
            required: false 
          }
        ]
      });
      if (!contact_) {
        throw new Error('Contact not found');
      }
      return {
        ...contact_.dataValues,
        _id: contact_.id
      };
    } catch (err) {
      throw err;
    }
  },
  getContactByQuery: async (_, {args}, { req }) => {
    console.log("Resolver: getContactByQuery...");
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
              required: false 
            });
            break;
          case 'production_company':
            include.push({ 
              model: production_company, 
              as: 'production_company', 
              foreignKey: 'entity_id', 
              where: { is_deleted: 'N' }, 
              required: false 
            });
            break;
          case 'venue':
            include.push({ 
              model: venue, 
              as: 'venue', 
              foreignKey: 'entity_id', 
              where: { is_deleted: 'N' }, 
              required: false 
            });
            break;
          case 'event':
            include.push({ 
              model: event, 
              as: 'event', 
              foreignKey: 'entity_id', 
              where: { is_deleted: 'N' }, 
              required: false 
            });
            break;
          case 'show':
            include.push({ 
              model: Show, 
              as: 'show', 
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

      const contacts = await Contact.findAll({
        where: where,
        include: include
      });
      return contacts.map(contact => {
        return {
          ...contact.dataValues,
          _id: contact.id
        };
      });
    } catch (err) {
      throw err;
    }
  },
},
RootMutation: {
  createContact: async (_, { contactInput }, { req }) => {
    console.log("Resolver: createContact...");
    if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
    try {
      const contact_ = await Contact.create({
        ...contactInput,
        create_time: moment().format(),
        created_by: req.userId,
        is_deleted: 'N'
      });
      return {
        ...contact_.dataValues,
        _id: contact_.id
      };
    } catch (err) {
      throw err;
    }
  },
  updateContact: async (_, { id, contactInput }, { req }) => {
    console.log("Resolver: updateContact...");
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contact_ = await Contact.findOne({
        where: { 
          id: id,
          is_deleted: 'N'
        }
      });
      if (!contact_) {
        throw new Error('Contact not found');
      }
      await contact_.update({
        ...contactInput,
        update_time: moment().format(),
        updated_by: req.userId,
      });
      return {
        ...contact_.dataValues,
        _id: contact_.id
      };
    } catch (err) {
      throw err;
    }
  },
  deleteContact: async (_, { id }, { req }) => {
    console.log("Resolver: deleteContact...");
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contact_ = await Contact.findByPk(id);
      if (!contact_) {
        throw new Error('Contact not found');
      }
      await contact_.update({
        is_deleted: 'Y',
        update_time: moment().format(),
        updated_by: req.userId,
      });
      return {
        ...contact_.dataValues,
        _id: contact_.id
      };
    } catch (err) {
      throw err;
    }
  },
}
};