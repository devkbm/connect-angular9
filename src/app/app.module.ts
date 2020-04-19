import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ko_KR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ko from '@angular/common/locales/ko';
import { GlobalProperty } from './global-property';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { CommonFuncModule } from './common/common-func.module';
import { BoardModule } from './cooperation/board/board.module';
import { CommunicationModule } from './cooperation/communication/communication.module';

registerLocaleData(ko);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,    
    NgZorroAntdModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN', headerName: "X-XSRF-TOKEN"}),        
    AppRoutingModule,
    AppLayoutModule,
    CommonFuncModule,
    BoardModule,
    CommunicationModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },    
    GlobalProperty
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
