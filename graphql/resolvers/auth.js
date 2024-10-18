const { user } = require('../../db/models'); 
const moment = require('moment-timezone');


const db = require("../../db/models");
const { is } = require('express/lib/request');
const { v4: uuidv4 } = require('uuid');


const authResolver = {
  Query: {
    login: async (_, { loginInput }) => {
      const user_ = await user.findOne({ 
        where: { 
          username: loginInput.username, 
          is_deleted: 'N' 
        } 
      });
      // if (!user_) {
      //   throw new Error('User not found');
      // }

      if (!user_) {
        console.log('User does not exist!');
        return{
          activityId: 0,
          token:"",
          tokenExpiration:0 ,
          error: 'User does not exist!'
        }
      }

      const isEqual = await bcrypt.compare(password, user_.password);

      if (!isEqual) {
        return{
          activityId: 0,
          token:"",
          tokenExpiration:0 ,
          error: 'Password is incorrect!'
        }
      }

      if (user_.verified !== true) {

        console.log('Please  verify user 1st!');
        return{
          activityId:user_.id,
          token:"",
          tokenExpiration:0 ,
          error: 'Please  verify user 1st!'}
      }

      const token = jwt.sign({ userId: user.id },process.env.JWT_TOKEN,{expiresIn: '4h'});

      await user_.update({
        // id: user_.id,
        logged_in: true,
      })


      return {
        userId: user_.id,
        token: token,
        tokenExpiration: 1
      };
    },
    verify: async (_, { verifyInput }, { req }) => {
      
      const challenge = {
        type: verifyType.type,
        code: verifyInput.code,
      }
      const preUser = await user.findOne({
        where: {
          username: verifyInput.username,
          email: verifyInput.email,
          is_deleted: 'N',
        }
      });
      if (!preUser) {
        console.log('User not found! Check your details & try again!');
        throw new Error('User not found! Check your details & try again!')
      }

      const response = {
        type: preUser.verification_type,
        code: preUser.verification_code,
      };

      let match = challenge.type === response.type && challenge.code === response.code;
      if (match === false) {
        throw new Error('challenge and response do not match. Check the type and code sent in the verification email and try again');
      }
      if (match === true) {
        console.log("login success");;
      }

      await preUser.update({
        verified: true,
        verification_code: null,
        verification_type: null,
      })


      return {
        user_id,
        type,
        response: 'Verification successful'
      };
    },
    requestPasswordReset: async (_, { passwordResetInput }, { req }) => {
      const user_ = await user.findOne({ 
        where: { 
          email: passwordResetInput.email,
          is_deleted: 'N',
        } });
      if (!user_) {
        throw new Error('User not found');
      }

      // EMAIL RSET CODE

      return 'Password reset code sent';
    },
    logout: async (_, {id}, { req }) => {
      console.log("Resolver: Logout...");
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }

      const user_ = await user.findOne({
        where: {
          id: id,
          is_deleted: 'N',
        }
      });
      if (!user_) {
        throw new Error('User not found');
      }
      if (user_.logged_in === false) {
        throw new Error('User is already logged out');
        
      }
      await user_.update({
        logged_in: false,
      });

      return 'User logged out';
    },
    testQuery: async (_, { args }, { req }) => {
      console.log("Resolver: Testing...", args, req);
      return `Received: ${args}`;
    },
  },
  Mutation: {
    passwordReset: async (_, { passwordResetInput }, { req }) => {
      const user_ = await user.findOne({ 
        where: { 
          email: passwordResetInput.email,
          is_deleted: 'N',
        } 
      });
      if (!user_) {
        throw new Error('User not found');
      }
      if (
        passwordResetInput.code === user_.reset_code
      ) {
          const hashedPassword = await bcrypt.hash(newPassword, 12);
          await user.update({ password: hashedPassword });
          return {
            email: user_.email,
            code: null,
            newPassword: null,
            response: 'Password reset successful'
          };
      }
      else {
        throw new Error('Reset code is incorrect');
      }
    },
    register: async (_, { registerInput }, { req }) => {
      const existingUser = await user.findOne({
        where: {
          username: registerInput.username,
          email: registerInput.email,
          is_deleted: 'N'
        }
      });

      if (existingUser) {
        throw new Error('User with this username or email already exists');
      }

      const randomUUID = uuidv4();
      const hashedPassword = await bcrypt.hash(registerInput.password, 12);
      const user_ = await user.create({
        username: registerInput.username,
        password: hashedPassword,
        email: registerInput.email,
        first_name: registerInput.first_name,
        last_name: registerInput.last_name,
        age: registerInput.age,
        gender: registerInput.gender,
        create_time: moment().format(),
        created_by: randomUUID,
      });

      return 'User registered successfully';
    },
  }
};

module.exports = authResolver;
