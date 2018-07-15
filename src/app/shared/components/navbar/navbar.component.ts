import {
  Component, OnInit, Input,
  AfterViewChecked, ViewChild, ElementRef, NgZone
} from '@angular/core';
import { INavOptions } from '../../models/navbar.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {
    '[class.has-navbar]': 'true'
  }
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  @Input() title;
  @Input() options: INavOptions = {
    title: '',
    routes: []
  };

  @ViewChild('links') public links: ElementRef;
  public isOverflowing: boolean = false;

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    // console.log('content checked');
    // if (this.links) {
    //   let el = this.links.nativeElement;
    //   let isOverflowing =  el.scrollHeight > el.clientHeight
    //     || el.scrollWidth > el.clientWidth;
    //
    //
    //
    //   console.log(isOverflowing);
    // }
  }

}
