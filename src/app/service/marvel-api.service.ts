import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

  PRIVATE_KEY = '55bb95924325d4c8f980f3465a7cecc7912e3b4b';
  PUBLIC_KEY  = 'd9e986bc36dff925ac8af63f62037bcd';
  HASH = '6f27cda563f66088a8b6da9e63b9e2bb'; 
  URL_API = `https://gateway.marvel.com/v1/public/{method}?ts=2&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;
  URL_API_2 = `https://gateway.marvel.com/v1/public/{method}/`;


  series_results: [];
  comics_results: [];

  offset: number;
  limit: number; 
  total: number; 

  constructor(private http:HttpClient) {}

  getAllSeries(){

    let promise = new Promise((resolve, reject) => {
      var url = this.URL_API.replace("{method}", "series"); 
      console.log(url);
      this.http.get<any>(url)
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

  getSerieByTitle(title: string)
  {

    let promise = new Promise((resolve, reject) => {
      var url = this.URL_API.replace("{method}", "series"); 
      url = url + "&titleStartsWith="+title;
      console.log(url);
      this.http.get<any>(url)
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

  getAllComicsBySerie(serieId: number, limit:number, offset:number)
  {
    let promise = new Promise((resolve, reject) => {
      var url = this.URL_API_2.replace("{method}", "series");
      url = url + serieId + '/comics';
      url = url + '?ts=2&apikey=' + this.PUBLIC_KEY + '&hash=' + this.HASH;
  
      if(limit > 0)
      {
        url = url + '&limit=' + limit;
      }

      if(offset > 0)
      {
        url = url + '&offset=' + offset;
      }
      
      this.http.get<any>(url)
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
      );
    });

    return promise;
  }

  getMethod(url)
  {
      let promise = new Promise((resolve, reject) => {
        url = url + "&apikey=" + this.PUBLIC_KEY + "&hash=" +this.HASH;

        this.http.get<any>(url)
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

  getComics(limit: number, offset: number)
  {
    let  promise = new Promise((resolve, reject) => {
        var url = this.URL_API.replace("{method}", "comics");
        var URL_WITH_FILTER = url;

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
      var url = this.URL_API.replace("{method}", "comics");
      console.log(url);
      this.http.get<any>(url)
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
