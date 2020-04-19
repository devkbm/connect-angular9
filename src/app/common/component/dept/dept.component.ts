import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { DeptTreeComponent } from './dept-tree.component';
import { DeptFormComponent } from './dept-form.component';
import { AppBase } from '../../app/app-base';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent extends AppBase implements OnInit {

    queryKey = 'programCode';
    queryValue = '';

    @ViewChild('deptTree', {static: true})
    tree: DeptTreeComponent;

    @ViewChild('deptForm', {static: false})
    form: DeptFormComponent;

    constructor(location: Location) { 
        super(location); 
    }

    ngOnInit() {
        this.getDeptTree();
    }

    public getDeptTree(): void {
        this.tree.getDeptHierarchy();
    }

    public initForm(): void {
        this.form.newForm();
    }

    public saveDept(): void {
        this.form.submitDept();
    }

    public deleteDept(): void {
        this.form.deleteDept();
    }

    public selectedItem(item): void {
        this.form.getDept(item.deptCode);
    }

}
