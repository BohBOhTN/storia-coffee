require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const articlesRouter = require('./routes/articles');
const salesRouter = require('./routes/sales');
const productAlertsRouter = require('./routes/product_alerts');
const notificationsRouter = require('./routes/notifications');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/articles', articlesRouter);
app.use('/sales', salesRouter);
app.use('/product_alerts', productAlertsRouter);
app.use('/notifications', notificationsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
