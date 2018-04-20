import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }
  	findAll(){
  		return this._http.get('/authors')
  	}
  	addAuthor(name){
  		return this._http.post('/authors',{name: name})
  }
  deleteAuthor(id){
    console.log('/authors/'+id)
  	return this._http.delete('/authors/'+id)
  }
  updateAuthor(id, name){
    console.log(id, name)
    return this._http.put('/authors/'+id, {name:name})
  }
  findAuthor(id){
    return this._http.get('/authors/'+id)
  }
}
