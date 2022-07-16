import { User } from "./models/user";
import { Router } from "./simpleExpressFramework/Router";
import { createUser, getUsers } from "./user-controller";

export const userRouter = new Router();

userRouter.get('/users', getUsers);
userRouter.post('/users', createUser);
