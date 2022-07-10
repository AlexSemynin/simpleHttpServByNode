// const http = require("http");
import {EventEmitter} from 'events';
import http, { METHODS } from 'http';
import { HttpMethods, httpReuestListner, Router } from './Router';

export class SExpress {

  private _emitter: EventEmitter;
  private _server: http.Server;
  private _middlewares: httpReuestListner[];

  public get Emitter() {
    return this._emitter;
  }

  constructor(){
    this._emitter = new EventEmitter();
    this._server = this._createServer();
    this._middlewares = [];
  }

  public listen(port: string | number, callback: ()=>void) {
    this._server.listen(port, callback);
  }

  public use(middleware: (req: http.ClientRequest, resp: http.ServerResponse) => void){
    this._middlewares.push(middleware);
  }

  public addRouter(router: Router) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach(method => {
        //@ts-ignore
        const handler = endpoint[method];

        this._emitter.on(this._getRouteMask(path, <HttpMethods>method), (req, res) => {
          this._middlewares.forEach(middleware => middleware(req, res))
          handler(req, res);
        });

      })
    });
  }

  
  private _createServer(): http.Server {
    return http.createServer((req, res)=> {
      let body = "";

      req.on('data', (chank)=>{
        body += chank;
      });

      req.on("end", () => {
        if(body !== ""){
          //@ts-ignore
          req.body = JSON.parse(body);  
        }

        const isEmit = this._emitter.emit(this._getRouteMask(req.url, <HttpMethods>req.method), req, res);
        if(isEmit === false) {
          res.end(`rout for ${this._getRouteMask(req.url, <HttpMethods>req.method)} is not exist`);
        }
      })
    })
  }

  private _getRouteMask(path?: string, method?: HttpMethods) {
    return `[${path}]:[${method}]`
  }

}