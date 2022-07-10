const env = require("dotenv");
import * as http from 'http';
import { Router } from './simpleExpressFramework/Router';
import { SExpress } from './simpleExpressFramework/sExpress';
import {userRouter} from './user-router';


env.config();
const PORT = process.env.PORT || 5000;
console.log(process.pid);
console.log(process.env.NODE_ENV);


const sExpress = new SExpress();
sExpress.addRouter(userRouter);
sExpress.listen(PORT, () => console.log(`server started on ${PORT}`));

