import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ProgramService } from '../../service/program.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseObject } from '../../model/response-object';
import { WebResource } from '../../model/web-resource';
import { FormBase, FormType } from '../../form/form-base';
import { existingWebResourceValidator } from '../../validator/web-resource-duplication-validator.directive';
import { CommonCodeService } from '../../service/common-code.service';
import { CommonCode } from '../../model/common-code';
import { ResponseList } from '../../model/response-list';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent extends FormBase implements OnInit {

  fg: FormGroup;

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  formControlSm = 24;

  resourceTypeList: CommonCode[];

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private programService: ProgramService,
              private commCodeService: CommonCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      resourceCode  : new FormControl(null, {
                                              validators: Validators.required,
                                              asyncValidators: [existingWebResourceValidator(this.programService)],
                                              updateOn: 'blur'
                                            }),
      resourceName  : [ null, [ Validators.required ] ],
      resourceType  : [ null, [ Validators.required ] ],
      url           : [ null, [ Validators.required ] ],
      description   : [ null]
    });

    this.getCommonCodeList();
    this.newForm();
  }
  private getCommonCodeList() {
    this.commCodeService
      .getCommonCodeListByParentId('COM0001')
      .subscribe(
        (model: ResponseList<CommonCode>) => {
          if ( model.total > 0 ) {
            //this.modifyForm(model.data);
            console.log(model.data);
            this.resourceTypeList = model.data;
          } else {
            //this.newForm();
          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }
  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.controls['resourceCode'].enable();
  }

  public modifyForm(formData: WebResource): void {
    this.formType = FormType.MODIFY;

    this.fg.controls['resourceCode'].disable();

    this.fg.patchValue(formData);
  }

  public getProgram(id: string) {
    this.programService
      .getProgram(id)
      .subscribe(
        (model: ResponseObject<WebResource>) => {
          if ( model.total > 0 ) {
            this.modifyForm(model.data);
          } else {
            this.newForm();

          }
          this.appAlarmService.changeMessage(model.message);
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  public submitProgram() {
    this.programService
        .registerProgram(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteProgram() {
    this.programService
      .deleteProgram(this.fg.get('resourceCode').value)
      .subscribe(
        (model: ResponseObject<WebResource>) => {
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
