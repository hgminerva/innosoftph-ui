import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from './lead.service';

@Component({
  selector: 'my-lead',
  templateUrl: 'app/lead/lead.html'
})

export class LeadComponent implements OnInit {
  // inject career service
  constructor(private leadService: LeadService, private router: Router) { }

  // global variables
  public leadCollectionView: wijmo.collections.CollectionView;

  // lead delete modal
  leadDeleteConfirmationModal() {

  }

  // initialization
  ngOnInit() {
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['login']);
    } else {
      this.leadCollectionView = new wijmo.collections.CollectionView(this.leadService.getListLeadData(100));
      this.leadCollectionView.pageSize = 15;
      this.leadCollectionView.trackChanges = true;
    }
  }
}
