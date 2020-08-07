import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';
import { DutyCode } from '../model/duty-code';

@Injectable({
  providedIn: 'root'
})
export class DutyCodeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getDutyCodeList(params: any): Observable<ResponseList<DutyCode>> {
    const url = `${this.API_URL}/dutycode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<DutyCode>>(url, options).pipe(
      catchError(this.handleError<ResponseList<DutyCode>>('getDutyCodeList', null))
    );
  }

  getValidDutyCode(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URL}/dutycode/${id}/valid`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<boolean>>('getValidDutyCode', null))
    );
  }

  /**
   * 근태코드정보를 조회한다.
   * @param id 근태코드
   */
  getDutyCode(id: string): Observable<ResponseObject<DutyCode>> {
    const url = `${this.API_URL}/dutycode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<DutyCode>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<DutyCode>>('getDutyCode', null))
    );
  }

  /**
   * 근태코드정보를 저장한다.
   * @param dutyCode 근태코드정보
   */
  saveDutyCode(dutyCode: DutyCode): Observable<ResponseObject<DutyCode>> {
    const url = `${this.API_URL}/dutycode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<DutyCode>>(url, dutyCode, options).pipe(
      catchError(this.handleError<ResponseObject<DutyCode>>('saveDutyCode', null))
    );
  }

  /**
   * 근태코드정보를 삭제한다.
   * @param id 근태코드
   */
  deleteDutyCode(id: string): Observable<ResponseObject<DutyCode>> {
    const url = `${this.API_URL}/dutycode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<DutyCode>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<DutyCode>>('deleteDutyCode', null))
              );
  }

}
