# Short cut way to setup

&nbsp;

Fork the repo.

Create a file `./.env/env.sh`. This is where all your secret tokens go. Do not commit it.

## Firebase setup

Register at **[Firebase](https://firebase.google.com/)**: This is where the site will be deployed.

Create a new app and create 2 hosting environments one for production and one for testing.

Replace the project name values in `.firebaserc`.

Get your Firebase token `FIREBASE_TOKEN` by executing `npx firebase login:ci`.

## PayTM setup

Create a PayTM merchant account and get your `merchant id`.

Replace variables `PAYTM_TEST.merchantId` and `PAYTM_PROD.merchantId` with your values.

Get your `PAYTM_KEY` and `PAYTM_TEST_KEY` secret variables and put it in `./.env/env.sh`.


## Google Tag manager setup

Register for Google tag manager, and replace the Google Tag Manager script in `templates/server.html` and put yours.

## Final step

Run `npm run deploy`. It deploys to production in about a minute.