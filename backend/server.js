var app = require('./config/server');

// Configuração da porta
const port = 8080
app.listen(port, function () {
    console.log(`Server run on port ${port}`);
});