const express = require('express');
const routes = require('./src/routes/logRoutes');
const app = express();

app.use(express.json());
app.use('/log', routes);


const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Logging Service running on port ${PORT}`);
});
