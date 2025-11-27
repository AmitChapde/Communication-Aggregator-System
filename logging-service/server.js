const express = require('express');
const routes = require('./src/routes/logRoutes');
const app = express();


app.use(express.json());
app.use('/log', routes);


app.listen(3003, () => console.log('Logging Service running on port 3003'));