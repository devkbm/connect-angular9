import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/common/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/common/grid/renderer/checkbox-renderer.component';

import { DutyCodeFormComponent } from './component/duty-code/duty-code-form.component';
import { DutyCodeService } from './service/duty-code.service';
import { DutyCodeComponent } from './component/duty-code/duty-code.component';
import { DutyCodeGridComponent } from './component/duty-code/duty-code-grid.component';

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
    DutyCodeFormComponent,
    DutyCodeGridComponent,
    DutyCodeComponent
  ],
  providers: [
    DutyCodeService
  ],
  exports: [
    DutyCodeComponent
  ]
})
export class DutyModule { }