const env = require("dotenv");
const http = require("http");
env.config();
const PORT = process.env.PORT || 5000; 

console.log(process.pid);
console.log(process.env.NODE_ENV);

const server = http.createServer((req,res)=> {
  res.writeHead(200, {
    'Content-type': "text/html; charset=utf8",
  });
  res.end("Ответ");
});

server.listen(PORT, () => console.log(`server started on ${PORT}`));