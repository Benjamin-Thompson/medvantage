import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private menuService:MenuService) { }

  ngOnInit() {
    /*try {
      if (!this.menuService.auth.isAuthenticated) {
        this.menuService.router.navigate(['/login']);
      }
    }
    catch(e) {
      this.menuService.router.navigate(['/login']);
    }*/
  }

}
