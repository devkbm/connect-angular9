import { TestInputComponent } from './component/test-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmCoreService } from './service/hrm-core.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TestInputComponent
  ],
  providers: [
    HrmCoreService
  ],
  exports: [
    TestInputComponent
  ]
})
export class HrmCoreModule { }
