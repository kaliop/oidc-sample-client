const
  FI_URL = process.env.FI_URL || 'http://sample-oidc-provider.dev-franceconnect.fr',
  FS_URL = process.env.FS_URL || 'http://localhost:3000';

module.exports = {
  FI_URL,
  FS_URL,
  CLIENT_ID: process.env.CLIENT_ID || '09a1a257648c1742c74d6a3d84b31943',
  CLIENT_SECRET: process.env.CLIENT_SECRET || '7ae4fef2aab63fb78d777fe657b7536f',
  AUTHORIZE_URL: `${FI_URL}/user/authorize`,
  TOKEN_URL: `${FI_URL}/user/token`,
  USERINFO_URL: `${FI_URL}/api/user`,
  LOGOUT_URL: `${FI_URL}/user/session/end`,
  LOGIN_CALLBACK_URL: `${FS_URL}/login-callback`,
  LOGOUT_CALLBACK_URL: `${FS_URL}/logout-callback`,
  SCOPES: 'openid profile email phone address',
};
