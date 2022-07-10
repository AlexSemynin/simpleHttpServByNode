import { User } from "./models/user";
import { Router } from "./simpleExpressFramework/Router";


const users: User[] = [{
  id: '0',
  name: "Вася",
  email: "vasya@mail.ru",
},{
  id: '1',
  name: "Alex",
  email: "alex@yandex.ru",
},];

export const userRouter = new Router();

userRouter.get('/users', (_, resp) => {
  resp.writeHead(200, {
    'Content-type': 'application/json; charset=utf8'
  })
  resp.end(JSON.stringify(users));
});

userRouter.post('/users', (req, resp) => {
  resp.end('send from /users:post');
});
