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
  // @ts-ignore
  resp.send(users);
});

userRouter.post('/users', (req, resp) => {
  // @ts-ignore
  resp.send('send from /users:post');
});
