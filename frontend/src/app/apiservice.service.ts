import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {


  constructor(private _http:HttpClient) {
  }

  //Get All Data
  getAllData()
 {
  const apiUrl = 'http://localhost:3000/user';
  return this._http.get(`${apiUrl}`)
  .pipe(map(response => response));
 }
 //Create Data
  createData(data: any)
{
  const apiUrl = 'http://localhost:3000/user';
  return this._http.post(`${apiUrl}`,data)
  .pipe(map(response => response));
}
//Delete Data
 deleteData(id: any)
{
  let ids=id;
  const apiUrl = 'http://localhost:3000/user';
  return this._http.delete(`${apiUrl}/${ids}`)
  .pipe(map(response => response));
}

//Update data
  updateData(data: any,id: any)
  {
    let ids=id;
    const apiUrl = 'http://localhost:3000/user';
    return this._http.put(`${apiUrl}/${ids}`,data)
    .pipe(map(response => response));
  }
//Get Single Data
  getSingleData(id:any) {
    let ids=id;
    const apiUrl = 'http://localhost:3000/user';
    return this._http.get(`${apiUrl}/${ids}`);
  }
}


