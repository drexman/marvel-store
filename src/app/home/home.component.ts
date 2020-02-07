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

  allCharacteres: Observable<any>;
  allSeries: Observable<any>; 
  allComics: Observable<any>;
  
  PRIVATE_KEY : string;
  HASH : string;

  constructor(private api: MarvelApiService) { }

  ngOnInit() {
    this.getAllSeries();
    this.getAllComics();

    this.PRIVATE_KEY = this.api.PRIVATE_KEY;
    this.HASH = this.api.HASH;
  }

  getAllCharacteres()
  {
    this.allCharacteres = this.api.getAllCharacteres();
  }

  getAllSeries()
  {
    this.allSeries = this.api.getAllSeries();
  }

  getAllComics()
  {
    this.allComics = this.api.getAllComics();
  }

}
