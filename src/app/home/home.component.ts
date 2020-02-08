import { MarvelApiService } from '../service/marvel-api.service';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal, ModalDismissReasons,  NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  page: number = 1;
  offset: number;
  limit: number = 20; 
  total: number; 
  total_pages: number;

  comics: [];
  comic: never;
  closeResult: string;
  modalReference: NgbModalRef;

  private loading_series: boolean = false;
  private loading_comics: boolean = false;

  constructor(private router : Router, private api: MarvelApiService,private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllSeries();
    this.getAllComics();

    this.comics = [];
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

  addShopCart(content, c : never)
  {
    this.comic = c;
    this.open(content);
  }

  confirm(){
    this.comics.push(this.comic);
    sessionStorage.setItem("comics", JSON.stringify(this.comics));
    var target = document.getElementById('shopcarts');
    target.innerHTML = '<i class="glyphicon glyphicon-shopping-cart"></i> ( ' + this.comics.length + ' ) Carrinho';
    this.close();
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  close() {
    this.modalReference.close();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
