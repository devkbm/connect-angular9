import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonFuncModule } from '../../common/common-func.module';
import { NzButtonModule, NzFormModule, NzDividerModule, NzPopconfirmModule } from 'ng-zorro-antd';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from '../../common/grid/renderer/button-renderer.component';

import { SurveyService } from './service/survey.service';

import { SurveyFormComponent } from './component/survey-form.component';
import { SurveyItemFormComponent } from './component/survey-item-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,    
    NzButtonModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzFormModule,
    AgGridModule.withComponents([ButtonRendererComponent])
  ],
  declarations: [
    SurveyFormComponent,
    SurveyItemFormComponent
  ],
  providers: [    
    DatePipe,
    SurveyService
  ],
  exports: [
    SurveyFormComponent
  ]
})
export class SurveyModule { }
