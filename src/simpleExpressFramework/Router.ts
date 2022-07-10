import { Http2ServerRequest, Http2ServerResponse } from "http2";
import { EventEmitter } from 'events';
import * as http from 'http';

// export const emitter = new EventEmitter();

export class Router {
  constructor() {
    this.endpoints = {};
  }
  public endpoints: Endpoints;

  public request(method: HttpMethods = 'GET', path: string, handler: httpReuestListner) {
      if(this.endpoints[path] == undefined) {
        //@ts-ignore
        this.endpoints[path] = {}
      }
      const addedEndopint = this.endpoints[path]
      if(addedEndopint[method] !== undefined) {
        throw new Error(`[${method}] по адресу [${path}] уже существует`);
      }

      addedEndopint[method] = handler;
      // emitter.on(`[${path}]:[${method}]`, (req: http.ClientRequest, resp: http.ServerResponse) => {
      //   handler(req, resp);
      // });
  }

  public get(path: string, handler: httpReuestListner ) {
    this.request('GET', path, handler);
  }
  public post(path: string, handler: httpReuestListner ) {
    this.request('POST', path, handler);
  }
  public put(path: string, handler: httpReuestListner ) {
    this.request('PUT', path, handler);
  }
  public delete(path: string, handler: httpReuestListner ) {
    this.request('DELETE', path, handler);
  }
}

export type HttpMethods = 'GET'| 'POST' | 'PUT' | 'DELETE';

export interface Endpoints {
  [path: string]: MethodDictionary;
}

export type MethodDictionary = {
  [method in HttpMethods]: httpReuestListner;
};

export type httpReuestListner = (req: http.ClientRequest, resp: http.ServerResponse) => void;
