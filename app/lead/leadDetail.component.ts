import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadDetailService } from './leadDetail.service';

@Component({
  selector: 'my-lead-detail',
  templateUrl: 'app/lead/leadDetail.html'
})

export class LeadDetailComponent implements OnInit {
  // inject career service
  constructor(private leadDetailService: LeadDetailService, private router: Router) { }

  // global variables
  public activityLineDetailModalString: String;
  public activityLineCollectionView: wijmo.collections.CollectionView;

  // activity line detail modal  
  activityLineDetailModal(add: boolean) {
    if (add) {
      this.activityLineDetailModalString = "Add";
    } else {
      this.activityLineDetailModalString = "Edit";
    }
  }

  // activity line delete modal
  activityLineDeleteConfirmationModal() {

  }

  // initialization
  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    } else {
      this.activityLineCollectionView = new wijmo.collections.CollectionView(this.leadDetailService.getListActivityLineData(100));
      this.activityLineCollectionView.pageSize = 15;
      this.activityLineCollectionView.trackChanges = true;
    }
  }
}
