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

userRouter.get('/users', (req, resp) => {
  //@ts-ignore
  if(req.params?.id !== undefined) {
    //@ts-ignore
    const userId = req.params?.id;
    const user = users.find(u => u.id === userId);
    if(user === undefined) {
      resp.end(`user with id={${userId}} not found`);
    }
    //@ts-ignore
    resp.send(user);
  }
  else{
    // @ts-ignore
    resp.send(users);
  }
});

userRouter.post('/users', (req, resp) => {
  // @ts-ignore
  const user = req.body;
  console.log(user);
  if(user === undefined) {
    resp.end("Ошибка ввода данных");
  }
  const userId = (parseInt(users[users.length-1].id) + 1).toString();
  const newUser: User = {...user, id: userId};
  users.push(newUser);
  // @ts-ignore
  resp.send({newUser});
});
