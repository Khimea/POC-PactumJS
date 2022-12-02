const { request, settings } = require('pactum');
const { Before } = require('@cucumber/cucumber');
const dotenv = require('dotenv');
dotenv.config();


Before(() => {
  request.setBaseUrl(process.env.ENVIRONMENT);
  settings.setReporterAutoRun(false);
});


