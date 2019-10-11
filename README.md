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
We need also to check if the idToken is valid (see next step)
