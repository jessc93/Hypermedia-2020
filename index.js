const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const yaml = require('yamljs');
const swaggerUI = require('swagger-ui-express');

const SwaggerDocument = yaml.load('./backend/spec.yaml');

app.use(express.static(__dirname + '/public/assets'));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
app.use(bodyParser.json({ limit: '1mb' }));

app.use(
  '/backend/swaggerui',
  swaggerUI.serve,
  swaggerUI.setup(SwaggerDocument),
);

// API routes
app.use(require('./other/routes'));
app.use('/backend', express.static(__dirname + '/backend'));

app.use(express.static(__dirname + '/public'));

// Route for static
[
  'calendar',
  'cart',
  'contactus',
  'edetails',
  'events',
  'login',
  'pdetails',
  'performers',
  'presentation',
  'reservation',
  'sdetails',
  'signin',
].map((el) => {
  app.get('/' + el, function(req, res) {
    res.sendFile(path.join(__dirname + '/public/pages/' + el + '.html'));
  });
});

function composeParameters(query) {
  let finalString = '';
  if (Object.keys(query).length > 0) {
    finalString += '?';
    for (let key of Object.keys(query)) {
      finalString += `${key}=${query[key]}`;
    }
  }
  return finalString;
}

var port = process.env.PORT || 80;
port = 3000;

app.listen(port);
