import { EmployeeSelectComponent } from './component/employee-select.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { HrmCoreService } from './service/hrm-core.service';

import { TestInputComponent } from './component/test-input.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  declarations: [
    TestInputComponent,
    EmployeeSelectComponent
  ],
  providers: [
    HrmCoreService
  ],
  exports: [
    TestInputComponent,
    EmployeeSelectComponent
  ]
})
export class HrmCoreModule { }
