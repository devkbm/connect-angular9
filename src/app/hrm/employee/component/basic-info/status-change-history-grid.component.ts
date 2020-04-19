import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { ResponseList } from 'src/app/common/model/response-list';
import { StatusChangeHistory } from '../../model/status-change-history';

@Component({
  selector: 'app-status-change-history-grid',
  templateUrl: './status-change-history-grid.component.html',
  styleUrls: ['./status-change-history-grid.component.css']
})
export class StatusChangeHistoryGridComponent extends AggridFunction implements OnInit {

  @Input()
  gridList: StatusChangeHistory[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService) {

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
      { headerName: '식별자',     field: 'id',          width: 150 },
      { headerName: '발령코드',   field: 'appointmentCode',    width: 150 },
      { headerName: '상태코드',   field: 'statusCode',    width: 150 },
      { headerName: '시작일',     field: 'fromDate',    width: 200 },
      { headerName: '종료일',     field: 'toDate',      width: 200 }
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
    this.setWidthAndHeight('100%','500px');
  }

  onEditButtonClick(e) {
    this.editButtonClicked.emit(e.rowData);
  }

  selectionChanged(event) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event) {
    this.rowDoubleClicked.emit(event.data);
  }

}