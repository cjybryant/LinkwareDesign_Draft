// module.exports = {
//   build: {
//     "index.html": "index.html",
//     "app.js": [
//       "javascripts/app.js"
//     ],
//     "app.css": [
//       "stylesheets/app.css"
//     ],
//     "images/": "images/"
//   },
//   rpc: {
//     host: "localhost",
//     port: 8545
//   }
// };

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    }
  },
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  }
};
