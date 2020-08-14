import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';
import { DutyApplication } from '../model/duty-application';

@Injectable({
  providedIn: 'root'
})
export class DutyApplicationService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  /**
   * 근태신청정보를 조회한다.
   * @param params 조회조건
   */
  getDutyApplicationList(params: any): Observable<ResponseList<DutyApplication>> {
    const url = `${this.API_URL}/dutyapplication`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<DutyApplication>>(url, options).pipe(
      catchError(this.handleError<ResponseList<DutyApplication>>('getDutyApplicationList', null))
    );
  }

  /**
   * 근태신청정보를 조회한다.
   * @param id 근태신청Id
   */
  getDutyApplication(id: string): Observable<ResponseObject<DutyApplication>> {
    const url = `${this.API_URL}/dutyapplication/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<DutyApplication>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<DutyApplication>>('getDutyApplication', null))
    );
  }

  /**
   * 근태신청정보를 저장한다.
   * @param dutyApplication 근태신청정보
   */
  saveDutyApplication(dutyApplication: DutyApplication): Observable<ResponseObject<DutyApplication>> {
    const url = `${this.API_URL}/dutyapplication`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<DutyApplication>>(url, dutyApplication, options).pipe(
      catchError(this.handleError<ResponseObject<DutyApplication>>('saveDutyApplication', null))
    );
  }

  /**
   * 근태신청정보를 저장한다.
   * @param id 근태신청Id
   */
  deleteDutyApplication(id: string): Observable<ResponseObject<DutyApplication>> {
    const url = `${this.API_URL}/dutyapplication/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<DutyApplication>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<DutyApplication>>('deleteDutyApplication', null))
              );
  }

}
