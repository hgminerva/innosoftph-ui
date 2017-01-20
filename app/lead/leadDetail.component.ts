import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeadDetailService } from './leadDetail.service';

@Component({
  selector: 'my-lead-detail',
  templateUrl: 'app/lead/leadDetail.html'
})

export class LeadDetailComponent implements OnInit {
  // global variables
  public leadDateValue: Date;
  public leadReferredUserObservableArray: wijmo.collections.ObservableArray;
  public activityDetailModalString: String;
  public activityCollectionView: wijmo.collections.CollectionView;
  public id: number;

  // inject lead detail service
  constructor(
    private leadDetailService: LeadDetailService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  // activity line detail modal  
  activityDetailModal(add: boolean) {
    if (add) {
      this.activityDetailModalString = "Add";
    } else {
      this.activityDetailModalString = "Edit";
    }
  }

  // delete confirmation modal
  activityDeleteConfirmationModal() {

  }

  // values for Input date
  setLeadDateValue() {
    this.leadDateValue = new Date();
    this.getListUser();
    console.log(this.getIdUrlParameter());
  }

  // user list
  getListUser() {
    this.leadReferredUserObservableArray = this.leadDetailService.getListUserData();
    this.getListActivity();
  }

  // get url Id parameter
  getIdUrlParameter() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    return this.id;
  }

  // activity line list
  getListActivity() {
    this.activityCollectionView = new wijmo.collections.CollectionView(this.leadDetailService.getListActivityData(100));
    this.activityCollectionView.pageSize = 15;
    this.activityCollectionView.trackChanges = true;
  }

  // initialization
  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    }

    this.setLeadDateValue();
  }
}
