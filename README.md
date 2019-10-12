# oidc-sample-client
Demo OpenID Connect service provider in NodeJS (tutorial mode)

# Tutoral

## Requirements

NodeJS >= 8.16

## Init

Clone the sources:
```bash
git clone https://github.com/kaliop/oidc-sample-client.git && cd oidc-sample-client
```

Fetch the `start` tag to get the boostrap:
```bash
git checkout start
```

Install main depencencies:
```bash
npm install
```

Start the application:
```bash
npm start
```

Go to http://localhost:3000

## Step 1 - warm-up: standard local login

*checkout [step-01](https://github.com/kaliop/oidc-sample-client/commit/b57a95ad4c33bc79eb734009f3c0087be1a6edba)*

No difficulties here.
Note: To avoid having to install an external database for the tutorial, we use a CSV file to store fake useres, and [node-csv-query](https://github.com/rdubigny/node-csv-query) library to request it.

## Step 2 - logout

*checkout [step-02](https://github.com/kaliop/oidc-sample-client/commit/810c326eb878504c4a7138a36ac5e56407ad641a)*

Just detroy the session.

## Step 3 - OpenID Connect LoginAuthorize

*checkout [step-03](https://github.com/kaliop/oidc-sample-client/commit/b293f9458551841fc71776755744691dc0adaa31)*

Now, let's really start this tutorial.
We will implement a client connexion using the [Authorization Code Flow](https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth).
The tutorial code uses a sample identity provider hosted at http://sample-oidc-provider.dev-franceconnect.fr , or you can override environment variables (see [config file](./config.js)) if you want to use your own Idp.

The first step is to redirect the user to the identity provider's `authorize` enpoint, with the [required request parameters](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) :

* `response_type`: specifies the used authorization flow. ie. "code" here.

* `scope`: specifies which user data the service requires. <br>
[Space delimited list of keywords](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) ('openid', 'profile', 'email', 'address', 'phone'). At least "openid" is required. The other are optional.

* `client_id`: The OAuth 2.0 Client Identifier knonw by the identity provider.

* `redirect_uri`: the URL to which the end user will be redirected by the identity provider once authenticated. (ie. the `loginCallback` that will be implemented in next steps). This uri must have been registered at the identity provider size.

## Step 4 - Login Callback : get access token and id token.

*checkout [step-04](https://github.com/kaliop/oidc-sample-client/commit/50a397360f8e4f571baf2a87f768961ae32b7ec9)*

Once the end user has been authenticated by the identity provider, he is redirected to the `redrect_uri` specified above.
The `loginCallback` endpoint is as follow : `<service-fqdn>/login-callback?code=<code>`.

We need to call the [Token Endpoint](https://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint) as a POST HTTP request with following parameters:
* `grant_type`: must be "authorisation_code"
* `code`: the same code value that has just been sent within the loginCallback request. Used to validate the token request.
* `redirect_uri`: the current request URI.

The reponse must be a JSON containing a `access_token` and a `id_token` attributes.
We need also to check if the ID Token is valid (see next step)

## Step 5 - Login Callback : ID Token Validation

*checkout [step-05](https://github.com/kaliop/oidc-sample-client/commit/82e59bf42f60b06e0648995b2651bbb98d9d9c2c)*

Check if the ID Token is a valid JWT and if it is compliant to [OpenID ID Token Validation rules](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation).

## Step 6 - Login Callback : get User Info

*checkout [step-06](https://github.com/kaliop/oidc-sample-client/commit/237cb0286670bce71ab6722a86c9ef3290f75332)*

Call [User Info Endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo) to get all the needed user data, and store them in session.
Now, the end user is fully authenticated into our service.

## Step 7 - Login Callback : add scope and map fields

*checkout [step-07](https://github.com/kaliop/oidc-sample-client/commit/421f5e9600efe537a06b94b5c7f92b786397fd36)*

Claims full scopes to get every userInfo.
We also need to reformat the date received from userInfo, to match them to our local format.

## Step 8 - Add "state" and "nonce" parameters

*checkout [step-08](https://github.com/kaliop/oidc-sample-client/commit/80cad32f61e5f5d1ce2a283d9a617ac478bc7c36)*

These parameters are not required, but fully recommanded to secure the authentication flow.

Both are random values that are included into the userAuthorize request and check later within the flow:

* `state`, if present, must be added by the identity provider as additionnal parameter to`loginCallback` url.
* `nonce`, if present, must be added by the identity provider within the ID Token.

## Step 9: Logout propagation

*checkout [step-09](https://github.com/kaliop/oidc-sample-client/commit/8c95120e00c9cb59a02515d2a9b099b411eeca5e)*

Implement the logout propagation (see [RP-Initiated Logout](https://openid.net/specs/openid-connect-session-1_0.html#RPLogout)):

# Resources

* [Demo OpenID Connect identity provider](https://github.com/kaliop/oidc-sample-provider)
* [OpenID Connect Official Specifications](https://openid.net/specs/)
* [OpenID Connect Official Basic Guide](https://openid.net/specs/openid-connect-basic-1_0.html)
* [JSON Web Tokens](https://jwt.io/)
* [Unofficial documentation](https://developer.orange.com/tech_guide/openid-connect-1-0/)
* [List of certified OpenID Connect libraries](https://openid.net/developers/certified/)
