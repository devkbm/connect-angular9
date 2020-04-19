import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AggridFunction } from 'src/app/common/grid/aggrid-function';

import { HrmType } from '../../model/hrm-type';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { HrmCodeService } from '../../service/hrm-code.service';
import { ResponseList } from 'src/app/common/model/response-list';

@Component({
  selector: 'app-hrm-type-grid',
  templateUrl: './hrm-type-grid.component.html',
  styleUrls: ['./hrm-type-grid.component.css']
})
export class HrmTypeGridComponent extends AggridFunction implements OnInit {

  gridList: HrmType[];

  @Input()
  appointmentCode;

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,    
              private hrmCodeService: HrmCodeService) {

    super();

    this.columnDefs = [
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', 'padding': '0px'},
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: '',
          iconType: 'form'
        }
      },
      {
        headerName: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 70,
        cellStyle: {'text-align': 'center'}
      },
      { headerName: '유형',         field: 'hrmType.code',   width: 150 },
      { headerName: '코드',         field: 'code',        width: 150 },
      { headerName: '코드명',       field: 'codeName',    width: 200 },
      { headerName: '설명',         field: 'comment',     width: 200 },
      { headerName: '순번',         field: 'sequence',    width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowNodeId = function(data) {
        return data.id;
    };
  }

  ngOnInit() {
    this.getGridList("");
  }

  private onEditButtonClick(e) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(hrmType: string): void {
    const params = {
      hrmType : hrmType
    };

    this.hrmCodeService
        .getHrmTypeList(params)
        .subscribe(
          (model: ResponseList<HrmType>) => {
              if (model.total > 0) {
                  this.gridList = model.data;
              } else {
                  this.gridList = null;
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

  selectionChanged(event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event) {
    this.rowDoubleClicked.emit(event.data);
  }

}