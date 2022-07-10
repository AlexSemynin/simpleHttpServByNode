const env = require("dotenv");
import * as http from 'http';
import { Router, emitter } from './Router';


env.config();
const PORT = process.env.PORT || 5000;
console.log(process.pid);
console.log(process.env.NODE_ENV);

const router = new Router();

router.get('/users', (_, resp) => {
  resp.end('send from /users');
});

router.get('/post', (_, resp) => {
  resp.end('send from /post');
});

const server = http.createServer((req, res)=> {
  const emit = emitter.emit(`[${req.url}]:[${req.method}]`, req, res);
  if(emit === false) {
    res.end(`rout for [${req.url}]:[${req.method}] is not exist`);
  }
});

server.listen(PORT, () => console.log(`server started on ${PORT}`));

