const app = require('./app');
const { PORT } = require('./config/config');

app.listen(PORT, () => {
  console.log(`
  🚀 NEXUS BACKEND STARTED
  -------------------------
  PORT: ${PORT}
  HEALTH: http://localhost:${PORT}/health
  ANALYTICS: http://localhost:${PORT}/api/analytics
  CHAT: http://localhost:${PORT}/api/chat
  -------------------------
  `);
});
