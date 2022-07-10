const env = require("dotenv");
import * as http from 'http';
import { Router } from './simpleExpressFramework/Router';
import { SExpress } from './simpleExpressFramework/sExpress';


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

const sExpress = new SExpress();
sExpress.addRouter(router);
sExpress.listen(PORT, () => console.log(`server started on ${PORT}`));

