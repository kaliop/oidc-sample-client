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
