const express = require('express');
const messageRoutes = require('./src/routes/messageRoutes');


const app = express();
app.use(express.json());
app.use('/send', messageRoutes);


app.listen(3001, () => console.log('Task Router running on port 3001'));