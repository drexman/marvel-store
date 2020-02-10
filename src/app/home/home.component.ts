import { Component,Renderer, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { MarvelApiService } from '../service/marvel-api.service';
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

  title: string = "";
  serieId: number = 0;
  comics: [];
  comic: never;
  closeResult: string;
  modalReference: NgbModalRef;

  private loading_series: boolean = false;
  private loading_comics: boolean = false;

  constructor(private router : Router, private api: MarvelApiService,private modalService: NgbModal, private renderer:Renderer) { }

  ngOnInit() {
    this.init();
  }

  init()
  {
    const itemMain = document.getElementsByClassName('nav-item')[0];
    const itemShopCarts = document.getElementsByClassName('nav-item')[1];
    this.renderer.setElementClass(itemMain, "active", true);
    itemShopCarts.classList.remove("active");

    this.getAllSeries();
    this.getAllComics();

    this.comics = [];
  }

  onKeydown(event)
  {
     if(event.key === "Enter"){
       this.getSerieByTitle();
     }
  }

  getSerieByTitle()
  {
    if(this.title.length > 0)
    {
      this.loading_series = true;

      this.api.getSerieByTitle(this.title).then(r => {
        this.loading_series = false;
      });
    } else {
      this.getAllSeries();
    }
  }

  getAllSeries()
  {
    this.loading_series = true;
    this.api.getAllSeries().then(r => {
      this.loading_series = false;
      
    });
  }

  getComicsBySerie(serieId: number)
  {
    this.serieId = serieId;
    this.onChange();
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

    if(this.serieId > 0)
    {
      this.api.getAllComicsBySerie(this.serieId, this.limit, offset)
      .then(r => {
        this.loading_comics = false;
        this.limit = this.api.limit; 
        this.total = this.api.total;

        if(this.total >= this.limit)
        {
          this.total_pages = Math.round(this.total / this.limit);
        } else {
          this.total_pages = 1;
        }
      })
    } else {
      this.api.getComics(this.limit,offset).then(r => {
        this.loading_comics = false;
        this.limit = this.api.limit; 
        this.total = this.api.total;
        if(this.total >= this.limit)
        {
          this.total_pages = Math.round(this.total / this.limit);
        } else {
          this.total_pages = 1;
        }
      });
    }
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
      if(this.total >= this.limit)
      {
        this.total_pages = Math.round(this.total / this.limit);
      } else {
        this.total_pages = 1;
      }
    });
  }

  onClickPrevious()
  {
    if(this.page > 1)
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
    target.innerHTML = '<i class="fa fa-shopping-cart fa-lg"></i> ( ' + this.comics.length + ' ) Carrinho';
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
