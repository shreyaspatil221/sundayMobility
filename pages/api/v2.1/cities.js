const cities = require('../../../src/components/__mocks__/cities.json');

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(cities));
};
