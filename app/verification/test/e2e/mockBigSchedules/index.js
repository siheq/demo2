const express = require('express');
const app = express();
const {locations} = require('./fixtures');

app.get('/openapi/locations/list', function (req, res) {
  const keyword = req.param('keyword');
  res.send(locations[keyword]);
});

app.listen(process.env.MOCK_BIG_SCHEDULES_PORT, function () {
  // eslint-disable-next-line no-console
  console.log('Mock BigSchedules server running on port 3000.');
});

