import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/common/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/common/grid/renderer/checkbox-renderer.component';

import { AppointmentCodeComponent } from './component/appointment-code/appointment-code.component';
import { AppointmentCodeFormComponent } from './component/appointment-code/appointment-code-form.component';
import { AppointmentCodeService } from './service/appointment-code.service';
import { AppointmentCodeDetailFormComponent } from './component/appointment-code/appointment-code-detail-form.component';
import { AppointmentCodeGridComponent } from './component/appointment-code/appointment-code-grid.component';
import { AppointmentCodeDetailGridComponent } from './component/appointment-code/appointment-code-detail-grid.component';
import { LedgerFormComponent } from './component/ledger/ledger-form.component';
import { LedgerComponent } from './component/ledger/ledger.component';
import { LedgerService } from './service/ledger.service';
import { LedgerListFormComponent } from './component/ledger/ledger-list-form.component';
import { LedgerListDetailGridComponent } from './component/ledger/ledger-list-detail-grid.component';
import { LedgerGridComponent } from './component/ledger/ledger-grid.component';
import { LedgerListGridComponent } from './component/ledger/ledger-list-grid.component';
import { HrmCodeService } from './service/hrm-code.service';
import { HrmTypeFormComponent } from './component/hrm-type/hrm-type-form.component';
import { HrmTypeComponent } from './component/hrm-type/hrm-type.component';
import { HrmTypeGridComponent } from './component/hrm-type/hrm-type-grid.component';
import { HrmTypeCodeFormComponent } from './component/hrm-type/hrm-type-code-form.component';
import { HrmTypeCodeGridComponent } from './component/hrm-type/hrm-type-code-grid.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    NgZorroAntdModule,    
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent]),
  ],
  declarations: [
    HrmTypeComponent,
    HrmTypeFormComponent,
    HrmTypeGridComponent,    
    HrmTypeCodeFormComponent,
    HrmTypeCodeGridComponent,
    
    AppointmentCodeComponent,
    AppointmentCodeFormComponent,
    AppointmentCodeGridComponent,
    AppointmentCodeDetailFormComponent,
    AppointmentCodeDetailGridComponent,

    LedgerFormComponent,
    LedgerListFormComponent,
    LedgerListDetailGridComponent,
    LedgerGridComponent,
    LedgerListGridComponent,
    LedgerComponent
  ],
  providers: [    
    HrmCodeService,
    AppointmentCodeService,
    LedgerService
  ],
  exports: [
    HrmTypeComponent,
    AppointmentCodeComponent,
    LedgerComponent
  ]
})
export class AppointmentModule { }
