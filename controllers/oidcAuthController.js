const config = require('../config');

const oidcLoginAuthorize = (req, res) => {
  return res.redirect(
    `${config.AUTHORIZE_URL}?response_type=code`
      + `&client_id=${config.CLIENT_ID}`
      + `&redirect_uri=${config.LOGIN_CALLBACK_URL}`
      + `&scope=${config.SCOPES}`
  );
};

module.exports = {
  oidcLoginAuthorize
};