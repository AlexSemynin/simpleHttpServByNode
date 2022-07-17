import fs from 'fs';
import path, { resolve } from 'path';
import { User } from './models/user';
import { v1 as uuidv1 } from 'uuid';

export class CustomDB {

  private _currentFolder: string;
  private _collectionsNames: string[] = [];

  /**
  * @param dir путь по которому будет создана папка
  * @returns 
  */
  constructor(dir: string){
    this._currentFolder = fs.mkdirSync(dir, {recursive: true}) ?? dir;
    this.getCollections()
      .then(files => this._collectionsNames = files)
      .catch(e => console.log(`Не удалось получить коллекцию: ${e}`));
  }

  /**
   * 
   * @returns список файлов-коллекций в БД
   */
  public async getCollections(): Promise<string[]> {
    return new Promise((res, rej) => {
      fs.readdir(this._currentFolder, (err, files) => {
        if(err){
          rej(err.message);
        }
        res(files);
      })
    })
  }

  /**
   * Вернуть имя коллекции, если она существует
   * @param collectionName имя коллекции
   * @returns collectionName
   */
  public async tryGetCollectionName(collectionName: string) {
    return (await this.getCollections()).find(c => c === collectionName);
  }

  /**
   * Добавить коллекцию по имени
   * @param collectionName 
   * @returns 
   */
  public async addCollection(collectionName: string) {
    const isCollectionExist = this._collectionsNames.findIndex(c => c === collectionName) !== -1;
    if(isCollectionExist) {
      console.log("Коллекция уже существует");
      return;
    }
    fs.writeFileSync(path.resolve(this._currentFolder, collectionName), "");
  }

  /**
   * Добавить сущность в коллекцию
   * @param collectionName 
   * @param entity 
   * @returns 
   */
  public async addEntity(collectionName: string, entity: any) {
    const id = uuidv1();
    entity.id = id;
    const userString = JSON.stringify(entity);
    const userCollectionName = await this.tryGetCollectionName(collectionName);
    if(userCollectionName === undefined) {
      console.log(`Коллекция ${collectionName} не найдена`);
      return;
    }
    fs.appendFile(path.resolve(this._currentFolder, userCollectionName), userString+'\n', (err)=>{
      if(err){
        console.log(`faled to add user: ${err?.message}`);
      }
    });
  }

  /**
   * Получить все объекты коллекции
   * @param collectionName 
   * @returns 
   */
  public async GetAll<T>(collectionName: string) {
    const userCollectionName = await this.tryGetCollectionName(collectionName);
    if(userCollectionName === undefined) {
      console.log(`Коллекция ${collectionName} не найдена`);
      return null;
    }

    let data = fs.readFileSync(path.resolve(this._currentFolder, userCollectionName), "utf-8");
    if(data.endsWith('\n')){
      data = data.slice(0, -1);
    }

    const entityes: T[] = data.split('\n').map(en => JSON.parse(en));
    return entityes;
  }
}
