import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { DeptTreeComponent } from 'src/app/common/component/dept/dept-tree.component';
import { EmployeeGridComponent } from '../basic-info/employee-grid.component';
import { SearchEmployee } from '../../model/search-employee';

@Component({
  selector: 'app-dept-employee-list',
  templateUrl: './dept-employee-list.component.html',
  styleUrls: ['./dept-employee-list.component.css']
})
export class DeptEmployeeListComponent implements OnInit {

  @ViewChild('deptTree', {static: true})
  tree: DeptTreeComponent;

  @ViewChild('employeeGrid', {static: true})
  grid: EmployeeGridComponent;

  constructor() { }

  ngOnInit() {
    this.tree.getDeptHierarchy();
  }

  deptTreeSelected(item) {
    console.log(item);
    this.grid.getGridList(new SearchEmployee('','',item.deptCode));
  }

}
