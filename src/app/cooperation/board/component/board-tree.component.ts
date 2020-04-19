import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { BoardService } from '../service/board.service';
import { ResponseList } from '../../../common/model/response-list';
import { BoardHierarchy } from '../model/board-hierarchy';

import { NzFormatEmitEvent } from 'ng-zorro-antd/core';

@Component({
  selector: 'app-board-tree',
  templateUrl: './board-tree.component.html',
  styles: ['']
})
export class BoardTreeComponent implements OnInit {

  @ViewChild('treeCom', {static: false}) treeCom;

  boardItems: BoardHierarchy[];

  @Input() searchValue = '';
  @Output() itemSelected = new EventEmitter();
  @Output() itemDbClicked = new EventEmitter();

  constructor(private boardService: BoardService) { }

  ngOnInit() {
    console.log('BoardTreeComponent init');
  }

  public getboardHierarchy(): void {
    this.boardService
      .getBoardHierarchy()
      .subscribe(
        (model: ResponseList<BoardHierarchy>) => {
            if ( model.total > 0 ) {
              this.boardItems = model.data;
            } else {
              this.boardItems = null;
            }

            // title 노드 텍스트
            // key   데이터 키
            // isLeaf 마지막 노드 여부
            // checked 체크 여부
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
        }
      );
  }

  nzClick(event: NzFormatEmitEvent): void {
    const node = event.node.origin;
    this.itemSelected.emit(node);
  }

  public nzDbClick(event: NzFormatEmitEvent): void {
    const node = event.node.origin;
    this.itemDbClicked.emit(node);
  }

}
