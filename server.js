// server.js
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'data/db.json')); // Adjust the path if necessary
const middlewares = jsonServer.defaults();

// Bind `json-server-auth` to `json-server`
server.db = router.db;
server.use(middlewares);
server.use(auth);

// Apply custom routes if `routes.json` exists
// const routes = require(path.join(__dirname, 'data/routes.json'));
// server.use(jsonServer.rewriter(routes));

// Mount the JSON Server router with auth
server.use(router);

// Start the server on port 8000
server.listen(8000, () => {
  console.log('JSON Server with auth is running on http://localhost:8000');
});
