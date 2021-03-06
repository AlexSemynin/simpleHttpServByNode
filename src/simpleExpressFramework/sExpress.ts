// const http = require("http");
import {EventEmitter} from 'events';
import http, { METHODS } from 'http';
import { CustomDB } from '../CustomDB';
import { HttpMethods, httpReuestListner, Router } from './Router';

export class SExpress {

  private _emitter: EventEmitter;
  private _server: http.Server;
  private _middlewares: ((req: http.IncomingMessage, resp: http.ServerResponse) => void)[];
  private _db: CustomDB|undefined = undefined;

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

  public use(middleware: (req: http.IncomingMessage, resp: http.ServerResponse) => void){
    this._middlewares.push(middleware);
  }

  public connect(db: CustomDB) {
    this._db = db;
  }

  public addRouter(router: Router) {
    Object.keys(router.endpoints).forEach(path => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach(method => {
        //@ts-ignore
        const handler = endpoint[method];

        this._emitter.on(this._getRouteMask(path, <HttpMethods>method), (req, res) => {
          handler(req, res, this._db);
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
        try{
          if(body !== ""){
            //@ts-ignore
            req.body = JSON.parse(body);  
          }
        }catch(e){
          console.log("Некорректный формат");
          //@ts-ignore
          res.end(e.message);
          return;
        }
        
        this._middlewares.forEach(middleware => middleware(req, res));
        
        //@ts-ignore
        const isEmit = this._emitter.emit(this._getRouteMask(req.pathName, <HttpMethods>req.method), req, res);
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