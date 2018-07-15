import { Component, Output, Input, OnInit, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-coeliac-table',
  templateUrl: './coeliac-table.component.html',
  styleUrls: ['./coeliac-table.component.scss']
})
export class CoeliacTableComponent implements OnChanges {
  @Output() goPageEmit = new EventEmitter();
  @Output() sendDataEmit = new EventEmitter();
  @Input() fields: any = [];
  @Input() datas: any = [];
  @Input() totalDataNum;
  @Input() dataDisplayNumber;

  filtered: any;

  pageArr: any = [];
  currentPage: number;

  paginavDisplayNum: number;
  currentPaginavNum: number;

  pagiPrevBtn: boolean;
  pagiNextBtn: boolean;

  constructor() {
    this.currentPage = 1;

    this.paginavDisplayNum = 5;
    this.currentPaginavNum = 1;

    this.pagiPrevBtn = true;
    this.pagiNextBtn = true;
  }

  goPage( pageNum ) {
    this.currentPage = pageNum;
    this.goPageEmit.emit( pageNum );
  }

  goPagination( flag: string ) {
    if ( flag === '1' ) {
      this.currentPaginavNum = this.currentPaginavNum - 1;
    } else if ( flag === '2' ) {
      this.currentPaginavNum = this.currentPaginavNum + 1;
    }

    const pageNum =  Math.ceil(this.totalDataNum / this.dataDisplayNumber);
    const paginavNum = Math.ceil(pageNum / this.paginavDisplayNum);
    const currentIndex = this.currentPaginavNum * this.paginavDisplayNum - this.paginavDisplayNum;
    let pageIndex = currentIndex + 1;
    if ( flag === '1' ) {
      pageIndex = this.currentPaginavNum * this.paginavDisplayNum;
    } else if ( flag === '2' ) {
      pageIndex = currentIndex + 1;
    }
    this.goPage( pageIndex );

    this.pageArr = [];
    for ( let i = 1; i <= this.paginavDisplayNum; i++  ) {
      const p = currentIndex + i;
      if ( p > pageNum ) {
        continue;
      }
      this.pageArr.push( currentIndex + i );
    }

    if ( this.currentPaginavNum === 1 ) {
      this.pagiPrevBtn = false;
    } else {
      this.pagiPrevBtn = true;
    }

    if ( this.currentPaginavNum >= paginavNum ) {
      this.pagiNextBtn = false;
    } else {
      this.pagiNextBtn = true;
    }
  }

  ngOnChanges(changes) {
    if (changes.datas && changes.datas.currentValue) {
      this.filtered = this.datas;
    }
    if (changes.totalDataNum && changes.totalDataNum.currentValue) {
      this.goPagination('0');
    }
  }

  rowSelect( data ) {
    this.sendDataEmit.emit( data );
  }

  filterData( filterValue ) {
    this.filtered = this.datas.filter(obj => {
      return !this.fields.every(k => {
        if ( k.field !== 'i' ) {
          return obj[k.field].indexOf(filterValue) < 0;
        } else {
          return true;
        }
      });
    });
  }

}

