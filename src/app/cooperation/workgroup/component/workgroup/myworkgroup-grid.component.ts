import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { AppAlarmService } from 'src/app/common/service/app-alarm.service';
import { ResponseList } from 'src/app/common/model/response-list';

import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroup } from '../../model/workgroup';


@Component({
  selector: 'app-myworkgroup-grid',
  templateUrl: './myworkgroup-grid.component.html',
  styleUrls: ['./myworkgroup-grid.component.css']
})
export class MyWorkGroupGridComponent extends AggridFunction implements OnInit {

  workGroupList: WorkGroup[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private workGroupService: WorkGroupService) {
    super();

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };
    
    this.columnDefs = [
      {
          headerName: 'No',
          valueGetter: 'node.rowIndex + 1',
          width: 40,
          cellStyle: {'text-align': 'center'},
          suppressSizeToFit: true,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true
      },
      {
          headerName: 'Id',
          field: 'id',
          width: 40,
          suppressSizeToFit: true,
          hide: true
      },
      {
        headerName: '작업그룹명',
        field: 'name'
      }
    ];    

    this.getRowNodeId = function(data) {
        return data.id;
    };
  }

  ngOnInit() {
    this.sizeToFit();
  }

  public getMyWorkGroupList(): void {
    this.workGroupService
        .getMyWorkGroupList()
        .subscribe(
          (model: ResponseList<WorkGroup>) => {
              if (model.total > 0) {
                  this.workGroupList = model.data;
              } else {
                  this.workGroupList = null;
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
    let ids = selectedRows.map(v => v.id)   // id 추출
                          .join(',');       // 콤마 구분자로 분리함
    //console.log(selectedRows[0]);
    //console.log(selectedRows);
    console.log(ids);    
    this.rowSelected.emit(ids);
  }

  rowDbClicked(event) {
    this.rowDoubleClicked.emit(event.data);
  }

}
