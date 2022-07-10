const env = require("dotenv");
const http = require("http");
env.config();

console.log(process.pid);
console.log(process.env.PORT);
console.log(process.env.NODE_ENV);