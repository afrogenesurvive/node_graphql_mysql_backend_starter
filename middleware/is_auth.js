const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('is_auth middleware',req.path,req.body);
  
  const openRoutes = [
    { path: '/graphql', method: 'POST', operationName: 'register' },
    { path: '/graphql', method: 'POST', operationName: 'login' },
    { path: '/graphql', method: 'POST', operationName: 'requestPasswordReset' },
  ];

  // Check if the current request matches any of the open routes
  const isOpenRoute = openRoutes.some(route => {
    return (
      req.path === route.path &&
      req.method === route.method &&
      req.body.operationName === route.operationName
    );
  });

  if (isOpenRoute) {
    return next();
  }

  const authHeader = req.get('Authorization');

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(' ')[1];

  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  req.username = decodedToken.username;
  next();
};
