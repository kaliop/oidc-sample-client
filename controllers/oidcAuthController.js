const
  request = require('async-request'),
  config = require('../config');

const oidcLoginAuthorize = (req, res) => {
  return res.redirect(
    `${config.AUTHORIZE_URL}?response_type=code`
      + `&client_id=${config.CLIENT_ID}`
      + `&redirect_uri=${config.LOGIN_CALLBACK_URL}`
      + `&scope=${config.SCOPES}`
  );
};

const oidcLoginCallback = async (req, res, next) => {
  // check if the mandatory Authorization code is there
  if (!req.query.code) {
    console.error('missing "code" parameter');
    return res.sendStatus(400);
  }

  try {
    // Get Access Token
    const body = {
      grant_type: 'authorization_code',
      redirect_uri: config.LOGIN_CALLBACK_URL,
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      code: req.query.code,
    };

    // Request access token.
    const tokenResponse = await request(config.TOKEN_URL, {
        method: 'POST',
        data: body,
      });

    const { access_token: accessToken, id_token: idToken } = JSON.parse(tokenResponse.body);
    if (!accessToken || !idToken) {
      console.error('Access token or idToken missing in response');
      return res.sendStatus(401);
    }

    if (!isIdTokenValid(idToken, req)) {
      console.error('Invalid idToken');
      return res.sendStatus(401);
    }

    console.log('OIDC Token OK');
    console.log('idToken', idToken);
    console.log('accessToken', accessToken);

    return res.redirect('/');
  } catch (error) {
    console.error('LoginCallback ERROR', error);
    return next(error);
  }
};

/*
idToken validation
@se https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation
*/
const isIdTokenValid = (idToken, req) => {
  // @TODO
  return true;
};

module.exports = {
  oidcLoginAuthorize,
  oidcLoginCallback,
};
