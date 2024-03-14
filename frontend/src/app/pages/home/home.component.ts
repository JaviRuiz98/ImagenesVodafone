import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  divAuditoria = '.sinCursor'

  constructor(private router: Router ) { }

  goTo(pagina: string) {
    const url = `/${pagina}`;
    this.router.navigate([url]);
  }


  highlightDiv() {
    
  }

  unhighlightDiv() {
    
  }
}
