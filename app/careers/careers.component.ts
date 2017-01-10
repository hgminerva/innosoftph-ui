import { Component, OnInit } from '@angular/core';
import * as wjFlexGrid from 'wijmo/wijmo.angular2.grid';
import { CareersService } from './careers.service';

@Component({
  selector: 'my-careers',
  templateUrl: 'app/careers/careers.html'
})

export class CareersComponent implements OnInit {
  // collection view
  public data: wijmo.collections.CollectionView;

  // injetc career service
  constructor(private careersService: CareersService) { }

  // initialization
  ngOnInit() {
    this.data = new wijmo.collections.CollectionView(this.careersService.getData(100));
    this.data.pageSize = 15;
    this.data.trackChanges = true;
  }

  detailModal(add: boolean) {
    console.log(add);
  }
}
