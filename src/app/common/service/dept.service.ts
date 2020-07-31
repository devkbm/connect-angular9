import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from './data.service';
import { ResponseObject } from '../model/response-object';
import { ResponseList } from '../model/response-list';

import { Dept } from '../model/dept';
import { DeptHierarchy } from '../model/dept-hierarchy';
import { GlobalProperty } from 'src/app/global-property';

@Injectable()
export class DeptService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/common/dept', http, tokenExtractor);
  }

  getDeptList(params?: any): Observable<ResponseList<Dept>> {
    const url = `${this.API_URL}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<Dept>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getDeptHierarchyList(params?: any): Observable<ResponseList<DeptHierarchy>> {
    const url = GlobalProperty.serverUrl + '/common/depttree';
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<DeptHierarchy>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  /**
   * 부서코드 중복여부를 검증한다.
   * @param id 부서코드
   */
  getValidateDeptDup(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URL}/${id}/valid`;

    //const url = GlobalProperty.serverUrl + '/common/depttree';
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<boolean>>('getValidateDeptDup', null))
    );
  }

  /**
   * 부서정보를 조회한다.
   * @param id 부서코드
   */
  getDept(id: string): Observable<ResponseObject<Dept>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<Dept>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  /**
   * 부서정보를 저장한다.
   * @param dept 
   */
  saveDept(dept: Dept): Observable<ResponseObject<Dept>> {
    const url = `${this.API_URL}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<Dept>>(url, dept, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  /**
   * 부서정보를 삭제한다.
   * @param id 부서코드
   */
  deleteDept(id: string): Observable<ResponseObject<Dept>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<Dept>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

}
