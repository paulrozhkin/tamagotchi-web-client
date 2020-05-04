import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-crud-header',
  templateUrl: './management-header.component.html',
  styleUrls: ['./management-header.component.css']
})
export class ManagementHeaderComponent implements OnInit {

  @Input() crudEntityName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
