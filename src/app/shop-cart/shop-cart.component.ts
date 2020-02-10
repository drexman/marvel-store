import { Component,Renderer, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons,  NgbModalRef} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {
  comic: any;
  comics: never[];
  modalReference: NgbModalRef;
  closeResult: string;
  constructor(private modalService: NgbModal, private renderer:Renderer) { }

  ngOnInit() {
    this.init();
  }

  init()
  {
    const itemMain = document.getElementsByClassName('nav-item')[0];
    const itemShopCarts = document.getElementsByClassName('nav-item')[1];
    this.renderer.setElementClass(itemShopCarts, "active", true);
    itemMain.classList.remove("active");

    if(typeof sessionStorage.getItem('comics') == 'undefined')
    {
        return;
    }

    this.comics = JSON.parse(sessionStorage.getItem('comics'));
  }

  

  removeBuy(content, c : any)
  {
    this.comic = c;
    this.open(content);
  }

  remove(){
    console.log(this.comic.id);
    const newComics = this.comics.filter((el:any) => {
      return el.id !== this.comic.id;
    });

    this.comics = newComics;

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
