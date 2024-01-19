import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-marco-elemento',
  templateUrl: './marco-elemento.component.html',
  styleUrls: ['./marco-elemento.component.css'], 
  standalone: true,
  imports: [
    CardModule
  ]
})


export class MarcoElementoComponent  implements OnInit{

  constructor() { }

  ngOnInit(): void {
  }
}