import { v1 as uuidv1 } from 'uuid';
import * as http from 'http';
import { User } from './models/user';
import { CustomDB } from './CustomDB';

// const users: User[] = [];

export const getUsers = async (req: http.ClientRequest, resp: http.ServerResponse, db: CustomDB) => {
  const users = await db.GetAll<User>('userCollection.txt');
  //@ts-ignore
  if(req.params?.id !== undefined) {
    //@ts-ignore
    const userId = req.params?.id;
    const user = users?.find(u => u.id === userId)//users.find(u => u.id === userId);
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
};

export const createUser = (req: http.ClientRequest, resp: http.ServerResponse, db: CustomDB) => {
  // @ts-ignore
  const user = req.body;
  console.log(user);
  if(user === undefined) {
    resp.end("Ошибка ввода данных");
  }
  const userId = uuidv1();//(parseInt(users[users.length-1].id) + 1).toString();
  const newUser: User = {...user, id: userId};
  // users.push(newUser);
  // @ts-ignore
  resp.send({newUser});
};