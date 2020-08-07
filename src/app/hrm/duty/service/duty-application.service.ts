import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';

@Injectable({
  providedIn: 'root'
})
export class DutyApplicationService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

}
