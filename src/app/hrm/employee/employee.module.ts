import { EmployeeMasterComponent } from './component/basic-info/employee-master.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/common/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/common/grid/renderer/checkbox-renderer.component';

import { EmployeeFormComponent } from './component/basic-info/employee-form.component';
import { DeptChangeHistoryGridComponent } from './component/basic-info/dept-change-history-grid.component';
import { JobChangeHistoryGridComponent } from './component/basic-info/job-change-history-grid.component';
import { StatusChangeHistoryGridComponent } from './component/basic-info/status-change-history-grid.component';
import { EmployeeGridComponent } from './component/basic-info/employee-grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    NgZorroAntdModule,
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent])
  ],
  declarations: [
    EmployeeFormComponent,
    DeptChangeHistoryGridComponent,
    JobChangeHistoryGridComponent,
    StatusChangeHistoryGridComponent,
    EmployeeGridComponent,
    EmployeeMasterComponent
  ],
  providers: [
  ],
  exports: [
    EmployeeFormComponent,
    EmployeeMasterComponent
  ]
})
export class EmployeeModule { }
