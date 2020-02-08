import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Marvel Loja Virtual';
  contador: number = 0;
  comics: [];

  ngOnInit() {
   
    if(typeof sessionStorage.getItem('comics') == 'undefined')
    {
      this.comics = [];
    }
    else
    {
      this.comics = JSON.parse(sessionStorage.getItem('comics'));
      this.contador = this.comics.length;
    }
  }

}
