const env = require("dotenv");
import * as http from 'http';
import { Router } from './simpleExpressFramework/Router';
import { SExpress } from './simpleExpressFramework/sExpress';
import {userRouter} from './user-router';
import {parseJsonMiddleware} from './midlewares/parseJson';
import { parseUrl } from './midlewares/parseUrl';
import path from 'path';
import {CustomDB} from './CustomDB';


env.config();
const PORT = process.env.PORT || 5000;
console.log(process.pid);
console.log(process.env.NODE_ENV);


const sExpress = new SExpress();
const curretnPath = path.resolve(__dirname, '../../db');
const userCollection = 'userCollection.txt';
const db = new CustomDB(curretnPath);

db.tryGetCollectionName(userCollection).then(collectionName => {
  if(collectionName === undefined){

    db.addCollection(userCollection);

    db.addEntity(userCollection, {email: 'alex@mail.ru', name: 'alex'})
      .then(() => { db.addEntity(userCollection, {email: 'alex@mail.ru1', name: 'alexsa'}) })
      .then(() => {db.addEntity(userCollection, {email: 'alex@mail.dasru1', name: 'aledewxsa'})})
      .catch(err => console.log(err));
  }
})

sExpress.connect(db);
sExpress.addRouter(userRouter);
sExpress.use(parseJsonMiddleware);
sExpress.use(parseUrl('http:localhost:5000'));

sExpress.listen(PORT, () => console.log(`server started on ${PORT}`));
