import { MarvelApiService } from '../service/marvel-api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  PRIVATE_KEY : string;
  HASH : string;

  page: number = 1;
  offset: number;
  limit: number = 20; 
  total: number; 
  total_pages: number;

  comics: [];

  private loading_series: boolean = false;
  private loading_comics: boolean = false;

  constructor(private api: MarvelApiService) { }

  ngOnInit() {
    this.getAllSeries();
    this.getAllComics();

    this.PRIVATE_KEY = this.api.PRIVATE_KEY;
    this.HASH = this.api.HASH;
  }

  getAllSeries()
  {
    this.loading_series = true;
    this.api.getAllSeries().then(r => {
      this.loading_series = false;
    });
  }

  getAllComics()
  {
    this.loading_comics = true;
    this.api.getAllComics().then(r => {
      this.loading_comics = false;

      this.limit = this.api.limit; 
      this.total = this.api.total;
      this.total_pages = Math.round(this.total / this.limit);
    });
  }

  onChange()
  {
    this.loading_comics = true;
    var offset = (this.page - 1) * this.limit;
    this.api.getComics(this.limit,offset).then(r => {
      this.loading_comics = false;
      this.limit = this.api.limit; 
      this.total = this.api.total;
      this.total_pages = Math.round(this.total / this.limit);
    });
  }
  
  onSelectLimite(valor)
  {
    this.loading_comics = true;
    var v = parseInt(valor);
    this.limit = v;
    var offset = (this.page - 1) * v;
    this.api.getComics(v,offset).then(r => {
      this.loading_comics = false;
      this.limit = this.api.limit; 
      this.total = this.api.total;
      this.total_pages = Math.round(this.total / this.limit);
    });
  }

  onClickPrevious()
  {
    if(this.page > 0)
    { 
      this.page--;
    } 
    this.onChange();
  }

  onClickNext()
  {
    if(this.page < this.total_pages)
    {
      this.page++;
    }
    this.onChange();
  }

  info(c)
  {
    console.log(c);
    this.comics = c.comics.items;
  }

}
