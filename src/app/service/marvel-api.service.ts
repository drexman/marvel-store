import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

  PRIVATE_KEY = '55bb95924325d4c8f980f3465a7cecc7912e3b4b';
  PUBLIC_KEY  = 'd9e986bc36dff925ac8af63f62037bcd';
  HASH = '6f27cda563f66088a8b6da9e63b9e2bb'; 

  URL_API = `https://gateway.marvel.com/v1/public/{method}?ts=2&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  constructor(private http:HttpClient) {}

  getAllCharacteres():  Observable<any>
  {
      this.URL_API = this.URL_API.replace("{method}","characters");
      console.log(this.URL_API);
      return this.http.get<any>(this.URL_API).pipe(map((data: any) => data.data.results));
  }


  getAllSeries(): Observable<any>
  {
    this.URL_API = this.URL_API.replace("{method}", "series"); 
    console.log(this.URL_API);
    return this.http.get<any>(this.URL_API).pipe(map((data: any) => data.data.results));
  }

  getAllComics(): Observable<any>{

    this.URL_API = this.URL_API.replace("{method}", "comics");
    console.log(this.URL_API);
    return this.http.get<any>(this.URL_API).pipe(map((data: any) => data.data.results));
  }
  

}
