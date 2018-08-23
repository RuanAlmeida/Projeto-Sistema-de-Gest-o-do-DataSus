const http = require('http'),
      app = require('./config/express');

http.createServer(app).listen(8080, function() {
    console.log(`Server run on port ${this.address().port}`);
});