import * as http from 'http';

export const parseJsonMiddleware = (req: http.IncomingMessage, resp: http.ServerResponse) => {
  resp.writeHead(200, {
    'Content-type': 'application/json; charset=utf8'
  });
  //@ts-ignore
  resp.send = (data: any) => {
    resp.end(JSON.stringify(data))
  }
};