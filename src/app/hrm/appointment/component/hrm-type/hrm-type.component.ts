import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/common/app/app-base';
import { HrmTypeGridComponent } from './hrm-type-grid.component';
import { HrmTypeCodeGridComponent } from './hrm-type-code-grid.component';
import { HrmTypeFormComponent } from './hrm-type-form.component';
import { HrmTypeCodeFormComponent } from './hrm-type-code-form.component';
import { HrmType } from '../../model/hrm-type';

@Component({
  selector: 'app-hrm-type',
  templateUrl: './hrm-type.component.html',
  styleUrls: ['./hrm-type.component.css']
})
export class HrmTypeComponent extends AppBase implements OnInit {

  @ViewChild('gridHrmType', {static: true}) gridHrmType: HrmTypeGridComponent;
  @ViewChild('formHrmType', {static: true}) formHrmType: HrmTypeFormComponent;
  @ViewChild('gridHrmTypeCode', {static: true}) gridHrmTypeCode: HrmTypeCodeGridComponent;
  @ViewChild('formHrmTypeCode', {static: true}) formHrmTypeCode: HrmTypeCodeFormComponent;

  protected selectedHrmTypeRow: HrmType;

  drawerVisibleHrmType = false;
  drawerVisibleHrmTypeCode = false;

  ledgerQueryKey = 'ledgerId';
  ledgerQueryValue;

  ledgerListQueryKey = 'empId';
  ledgerListQueryValue;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  public refreshGridHrmType(): void {
    this.closeDrawerHrmType();
    this.gridHrmType.getGridList('');
  }

  selectHrmType(row): void {
    this.selectedHrmTypeRow = row;
    this.gridHrmTypeCode.getGridList(row.id);
  }

  public newHrmTypeForm(): void {
    this.drawerVisibleHrmType = true;
    this.formHrmType.newForm();
  }

  editHrmType(row): void {
    this.formHrmType.getHrmType(row.id);
    this.drawerVisibleHrmType = true;
  }

  public closeDrawerHrmType(): void {
    this.drawerVisibleHrmType = false;
  }

  public selectHrmTypeCode(row): void {
    console.log(row);
  }

  public refreshGridHrmTypeCode(): void {
    this.closeDrawerHrmTypeCode();
    console.log(this.selectedHrmTypeRow.hrmType);
    this.gridHrmTypeCode.getGridList(this.selectedHrmTypeRow.id);
  }

  public newHrmTypeCodeForm(): void {
    this.drawerVisibleHrmTypeCode = true;
    this.formHrmTypeCode.newForm(this.selectedHrmTypeRow.id);
  }

  public editHrmTypeCodeForm(row): void {
    this.formHrmTypeCode.getHrmTypeDetailCode(row.id);
    this.drawerVisibleHrmTypeCode = true;
  }

  public closeDrawerHrmTypeCode(): void {
    this.drawerVisibleHrmTypeCode = false;
  }

}
