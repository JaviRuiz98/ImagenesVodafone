import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ir-arriba',
  templateUrl: './ir-arriba.component.html',
  styleUrls: ['./ir-arriba.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class IrArribaComponent{

  isShow!: boolean;
  topPosToStartShowing = 100;
  @HostListener('window:scroll')

  checkScroll() {

    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;


    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  goDown() {
    window.scroll({
      top: 200,
      left: 0,
      behavior: 'smooth',
    });
  }
}
