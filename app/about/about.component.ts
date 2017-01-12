import { Component } from '@angular/core';
import * as wjFlexGrid from 'wijmo/wijmo.angular2.grid';
import { AboutService } from './about.service';

@Component({
  selector: 'my-about',
  templateUrl: 'app/about/about.html'
})

export class AboutComponent  { 
    // global variables
  public detailModalString: String;

  // collection view
  public careerCollectionView: wijmo.collections.CollectionView;

  // inject career service
  constructor(private aboutService: AboutService) { }

  // initialization
  ngOnInit() {
    this.careerCollectionView = new wijmo.collections.CollectionView(this.aboutService.getData(100));
    this.careerCollectionView.pageSize = 15;
    this.careerCollectionView.trackChanges = true;
  }

  detailModal(add: boolean) {
    if (add) {
      this.detailModalString = "Add";
    } else {
      this.detailModalString = "Edit";
    }
  }

  deleteModal() {

  }
}
