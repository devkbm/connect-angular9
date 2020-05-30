import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { FormBase, FormType } from 'src/app/common/form/form-base';
import { ResponseObject } from 'src/app/common/model/response-object';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { HrmRelationCode } from '../../model/hrm-relation-code';
import { HrmCodeService } from '../../service/hrm-code.service';

@Component({
  selector: 'app-hrm-relation-code-form',
  templateUrl: './hrm-relation-code-form.component.html',
  styleUrls: ['./hrm-relation-code-form.component.css']
})
export class HrmRelationCodeFormComponent extends FormBase implements OnInit {

  fg: FormGroup;

  constructor(private fb:FormBuilder,
              private hrmCodeService: HrmCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      relationId  : [ null, [ Validators.required ] ], //new FormControl(fkBoard, {validators: Validators.required}),
      relCode     : [ null, [ Validators.required ] ],
      relCodeName : [ null, [ Validators.required ] ],
      parentId    : [ null, [ Validators.required ] ],
      childId     : [ null]
    });

    this.newForm(null);
  }  

  public newForm(typeId: string): void {
    this.formType = FormType.NEW;

    /**
     * 컨트롤 초기값 설정
     */
    this.fg.reset();
    this.fg.controls.typeId.setValue(typeId);    
    this.fg.controls.useYn.setValue(true);

    /**
     * 컨트롤 설정
     */
    this.fg.controls.typeId.disable();
    this.fg.controls.code.enable();
  }

  public modifyForm(formData: HrmRelationCode): void {
    this.formType = FormType.MODIFY;    

    this.fg.patchValue(formData);

    this.fg.controls.code.disable();
  }

  public select(param) {    
    this.getHrmTypeDetailCode(param.value['id']);
  }

  public getHrmTypeDetailCode(id: string): void {
    this.hrmCodeService
        .getHrmRelationCode(id)
        .subscribe(
          (model: ResponseObject<HrmRelationCode>) => {
            if ( model.total > 0 ) {              
              this.modifyForm(model.data);
            } else {
              this.newForm(null);
            }
            this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public submitForm(): void {
    this.hrmCodeService
        .saveHrmRelationCode(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<HrmRelationCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteHrmTypeDetailCode(): void {
    this.hrmCodeService
        .deleteHrmRelationCode(this.fg.get('id').value)
        .subscribe(
            (model: ResponseObject<HrmRelationCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }
}