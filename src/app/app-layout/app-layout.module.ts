import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { CommonLayoutRoutingModule } from './common-layout-routing.module';

import { AppLayoutComponent } from './app-layout.component';

import { MenuService } from '../common/service/menu.service';
import { ProgramService } from '../common/service/program.service';
import { AppAlarmService } from '../common/service/app-alarm.service';
import { CommonFuncModule } from '../common/common-func.module';
import { TermService } from '../common/service/term.service';
import { WorkgroupModule } from '../cooperation/workgroup/workgroup.module';
import { UserPopupComponent } from '../common/component/user/user-popup.component';
import { AppointmentModule } from '../hrm/appointment/appointment.module';
import { EmployeeModule } from '../hrm/employee/employee.module';


@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    CommonLayoutRoutingModule,
    CommonFuncModule,
    WorkgroupModule,
    AppointmentModule,
    EmployeeModule
  ],
  declarations: [
    AppLayoutComponent
  ],
  entryComponents: [
    UserPopupComponent
  ],
  providers: [
    AppAlarmService,
    MenuService,
    ProgramService,
    TermService
  ],
  exports: [
    AppLayoutComponent
  ]
})
export class AppLayoutModule { }
