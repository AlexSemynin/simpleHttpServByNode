import * as http from 'http';
import { URL } from 'url';

//для работы с модулем URL нуден полный маршрут http://localhost:5000/users?param=123
// req.url хранит только /users?param=123

export const parseUrl = (baseUrl: string) => (req:http.IncomingMessage, resp: http.ServerResponse) => {
  const parsedUrl = new URL(req.url!, baseUrl);

  console.log(parsedUrl);
}