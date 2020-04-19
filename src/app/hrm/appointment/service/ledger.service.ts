import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';


import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';


import { AppointmentCode } from '../model/appointment-code';
import { AppointmentCodeDetail } from '../model/appointment-code-detail';
import { Ledger } from '../model/ledger';
import { LedgerChangeInfo } from '../model/ledger-change-info';
import { LedgerList } from '../model/ledger-list';
import { LedgerGridComponent } from '../component/ledger/ledger-grid.component';
import { LedgerEmployee } from '../model/ledger-employee';

@Injectable()
export class LedgerService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getEmployeeList(): Observable<ResponseList<LedgerEmployee>> {
    const url = `${this.API_URL}/employee`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
     };

    return this.http.get<ResponseList<LedgerEmployee>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getAppointmentCodeList(params?: any): Observable<ResponseList<Ledger>> {
    const url = `${this.API_URL}/appointmentcode`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<Ledger>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getLedgers(param): Observable<ResponseList<Ledger>> {
    const url = `${this.API_URL}/ledger`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseList<Ledger>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getLedger(id: string): Observable<ResponseObject<Ledger>> {
    const url = `${this.API_URL}/ledger/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<Ledger>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  saveLedger(ledger: Ledger): Observable<ResponseObject<Ledger>> {
    const url = `${this.API_URL}/ledger`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<Ledger>>(url, ledger, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteLedger(id: string): Observable<ResponseObject<Ledger>> {
    const url = `${this.API_URL}/ledger/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<Ledger>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getLedgerList(ledgerId: string, listId: string): Observable<ResponseObject<LedgerList>> {

    const url = `${this.API_URL}/ledger/${ledgerId}/list/${listId}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<LedgerList>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getLedgerLists(params: any): Observable<ResponseList<LedgerList>> {
    const url = `${this.API_URL}/ledger/list`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<LedgerList>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  saveLedgerList(ledger: LedgerList): Observable<ResponseObject<LedgerList>> {
    const url = `${this.API_URL}/ledger/list`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<LedgerList>>(url, ledger, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  deleteLedgerList(ledgerId: string, listId: string): Observable<ResponseObject<LedgerList>> {
    const url = `${this.API_URL}/ledger/${ledgerId}/list/${listId}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<LedgerList>>(url, options)
              .pipe(
                catchError((err) => Observable.throw(err))
              );
  }

  getChangeInfo(appointmentCode: string): Observable<ResponseList<LedgerChangeInfo>> {
    const url = `${this.API_URL}/ledger/list/changeinfo/${appointmentCode}`;

    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
     };

    return this.http.get<ResponseList<LedgerChangeInfo>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  apponitProcess(ledgerId: string, listId: string): Observable<string>  {
    const url = `${this.API_URL}/ledger/${ledgerId}/list/${listId}/appoint`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<string>(url, null, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

}
