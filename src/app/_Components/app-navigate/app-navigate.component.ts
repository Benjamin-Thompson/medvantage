import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { MenuService } from '../menu/menu.service';
@Component({
  selector: 'app-app-navigate',
  templateUrl: './app-navigate.component.html',
  styleUrls: ['./app-navigate.component.css']
})
export class AppNavigateComponent implements OnInit {
  goodLocation:any;
  constructor(private menuSerivce:MenuService) { 
    this.goodLocation = this.menuSerivce;
  }

  ngOnInit() {
    this.goodLocation = this.menuSerivce;
  }

  changeMenuStatus() {
    this.menuSerivce.hideMenu = !this.menuSerivce.hideMenu;
  }

}
