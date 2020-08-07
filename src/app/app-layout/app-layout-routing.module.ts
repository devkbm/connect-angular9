import { DutyCodeComponent } from './../hrm/duty/component/duty-code/duty-code.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutComponent } from './app-layout.component';

import { BoardFormComponent } from '../cooperation/board/component/board-form.component';
import { ArticleFormComponent } from '../cooperation/board/component/article-form.component';


import { AuthorityComponent } from '../common/component/authority/authority.component';
import { UserComponent } from '../common/component/user/user.component';
import { ProgramComponent } from '../common/component/program/program.component';
import { MenuComponent } from '../common/component/menu/menu.component';
import { BoardComponent } from '../cooperation/board/component/board.component';
import { TermComponent } from '../common/component/terms/term.component';
import { CommonCodeComponent } from '../common/component/commoncode/common-code.component';
import { TeamComponent } from '../cooperation/communication/component/team.component';
import { DeptComponent } from '../common/component/dept/dept.component';
import { WorkgroupComponent } from '../cooperation/workgroup/component/workgroup/workgroup.component';
import { AppointmentCodeComponent } from '../hrm/appointment/component/appointment-code/appointment-code.component';
import { LedgerComponent } from '../hrm/appointment/component/ledger/ledger.component';
import { EmployeeMasterComponent } from '../hrm/employee/component/basic-info/employee-master.component';
import { HrmTypeComponent } from '../hrm/appointment/component/hrm-type/hrm-type.component';
import { SurveyFormComponent } from '../cooperation/survey/component/survey-form.component';
import { DeptEmployeeListComponent } from '../hrm/employee/component/dept-employee-list/dept-employee-list.component';
import { HrmRelationCodeComponent } from '../hrm/appointment/component/hrm-type/hrm-relation-code.component';


const layoutroutes: Routes = [
  {
    path: 'home', component: AppLayoutComponent,
    children: [
      /* 공통 시스템 */
      {path: 'user',          component: UserComponent},
      {path: 'auth',          component: AuthorityComponent},
      {path: 'program',       component: ProgramComponent},
      {path: 'menu',          component: MenuComponent},
      {path: 'commoncode',    component: CommonCodeComponent},
      {path: 'dept',          component: DeptComponent},
      {path: 'term',          component: TermComponent},
      /* 협업시스템 */
      {path: 'team',          component: TeamComponent},
      {path: 'board',         component: BoardComponent},
      {path: 'workgroup',     component: WorkgroupComponent},
      {path: 'surveyform',      component: SurveyFormComponent},
      /* 인사시스템 */
      {path: 'hrmtype',      component: HrmTypeComponent},
      {path: 'relationcode',      component: HrmRelationCodeComponent},
      {path: 'appointmentcode',     component: AppointmentCodeComponent},
      {path: 'appointmentledger',   component: LedgerComponent},
      {path: 'employee',      component: EmployeeMasterComponent},
      {path: 'deptemployeelist',      component: DeptEmployeeListComponent},
      {path: 'dutycode',      component: DutyCodeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(layoutroutes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
