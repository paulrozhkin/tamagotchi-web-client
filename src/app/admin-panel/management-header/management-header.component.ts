import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-management-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.css']
})
export class ManagementHeaderComponent implements OnInit {

  @Input() entityName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
