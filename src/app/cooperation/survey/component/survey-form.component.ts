import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ResponseObject } from '../../../common/model/response-object';
import { FormBase, FormType } from 'src/app/common/form/form-base';
import { SurveyService } from '../service/survey.service';
import { SurveyForm } from '../model/survey-form';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent extends FormBase implements OnInit {
  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  fromControlSm = 24;

  fg: FormGroup;

  constructor(private fb: FormBuilder,
              private surveyService: SurveyService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      teamId        : new FormControl({value: null, disabled: true}),
      teamName      : [ null, [ Validators.required ] ],
      memberList    : [ null ]
    });

  }

  public newForm(): void {
    this.formType = FormType.NEW;
  }

  public modifyForm(formData: SurveyForm): void {
    this.formType = FormType.MODIFY;
    this.fg.patchValue(formData);
  }

  public getSurveyForm(id: number): void {
    this.surveyService.getSurveyForm(id)
        .subscribe(
          (model: ResponseObject<SurveyForm>) => {
            if (model.data) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
          },
          (err) => {},
          () => {}
      );
  }

  public saveSurveyForm(): void {
    this.surveyService
        .saveSurveyForm(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<SurveyForm>) => {
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {
            console.log('완료');
          }
        );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
