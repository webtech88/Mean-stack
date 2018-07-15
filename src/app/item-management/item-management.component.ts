import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-management',
  templateUrl: './item-management.component.html',
  styleUrls: ['./item-management.component.scss']
})
export class ItemManagementComponent implements OnInit {
  routes: any;
  constructor() {
    this.routes = [{
      path: "category",
      link: "CATEGORY",
      active: true
    },{
      path: "type",
      link: "TYPE",
      active: false
    }]
  }

  ngOnInit() {
  }

  selectNavMenu(route){
    this.routes.forEach( _route => {
      _route.active = false;
    });
    route.active = true;
  }

}
