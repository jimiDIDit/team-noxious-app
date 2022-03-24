import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tna-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() pageTitle: string = '';
  @Input() pageDescription: string = '';
  @Input() currentLocation: string = 'Current Location';
  constructor(private router: Router) { }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnInit(): void {
    this.currentLocation?.toUpperCase()
  }

}