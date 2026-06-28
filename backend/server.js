const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`EventHub Server running in ${ENV} mode on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});