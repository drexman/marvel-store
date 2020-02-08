import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

  PRIVATE_KEY = '55bb95924325d4c8f980f3465a7cecc7912e3b4b';
  PUBLIC_KEY  = 'd9e986bc36dff925ac8af63f62037bcd';
  HASH = '6f27cda563f66088a8b6da9e63b9e2bb'; 
  URL_API = `https://gateway.marvel.com/v1/public/{method}?ts=2&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;


  series_results:  Observable<any>;
  comics_results: Observable<any>;

  offset: number;
  limit: number; 
  total: number; 

  constructor(private http:HttpClient) {}

  getAllSeries(){

    let promise = new Promise((resolve, reject) => {
      this.URL_API = this.URL_API.replace("{method}", "series"); 
      console.log(this.URL_API);
      this.http.get<any>(this.URL_API)
      .toPromise()
      .then(
        res => {
          this.series_results = res.data.results;
          resolve();
        },
        msg => {
          reject(msg);
        }
      );
    });
    return promise;
  }

  getComics(limit, offset)
  {
    let  promise = new Promise((resolve, reject) => {
        this.URL_API = this.URL_API.replace("{method}", "comics");
        var URL_WITH_FILTER = this.URL_API;

        if(limit > 0)
        {
          URL_WITH_FILTER =  URL_WITH_FILTER + "&limit=" + limit;
        }

        if(offset > 0)
        {
          URL_WITH_FILTER = URL_WITH_FILTER + "&offset=" + offset;
        }
        console.log(URL_WITH_FILTER);
        this.http.get<any>(URL_WITH_FILTER)
        .toPromise()
        .then(
          res => {
            this.limit = res.data.limit;
            this.offset = res.data.offset;
            this.total = res.data.total;
          
            console.log(res.data.results.length);
            this.comics_results = res.data.results;
            resolve();
          },
          msg => {
            reject(msg);
          }

        )
    });
    return promise;
  }

  getAllComics(){
    let promise = new Promise((resolve, reject) => {
      this.URL_API = this.URL_API.replace("{method}", "comics");
      console.log(this.URL_API);
      this.http.get<any>(this.URL_API)
    .toPromise()
    .then( 
        res => {
          this.limit = res.data.limit;
          this.offset = res.data.offset;
          this.total = res.data.total;

          this.comics_results = res.data.results;
          resolve();
        },
        msg => {
          reject(msg);
        }
      )
    });
    return promise;
  }

  
  
}
