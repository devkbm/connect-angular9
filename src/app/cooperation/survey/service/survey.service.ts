import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';
import { SurveyForm } from '../model/survey-form';

@Injectable({
  providedIn: 'root'
})
export class SurveyService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
      super('/survey', http, tokenExtractor);
  }

  /**
   * @description 팀명단을 조회한다.
   * @param id 팀 id
   */
  public getSurveyForm(id: number): Observable<ResponseObject<SurveyForm>> {
    const url = `${this.API_URL}/form/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders()
    };

    return this.http
      .get<ResponseObject<SurveyForm>>(url, options)
      .pipe(
        catchError(this.handleError<ResponseObject<SurveyForm>>('getTeam', null))
      );
  }

  /**
   * @description 팀을 저장한다.
   * @param team team 객체
   */
  public saveSurveyForm(surveyForm: SurveyForm): Observable<ResponseObject<SurveyForm>> {
    const url = `${this.API_URL}/form`;
    const options = {
      headers: this.getAuthorizedHttpHeaders()
    };

    return this.http
    .post<ResponseObject<SurveyForm>>(url, surveyForm, options)
    .pipe(
      catchError(this.handleError<ResponseObject<SurveyForm>>('saveSurveyForm', null))
    );

  }



}
