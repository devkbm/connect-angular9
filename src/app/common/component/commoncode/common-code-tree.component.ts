import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ResponseList } from '../../../common/model/response-list';
import { CommonCodeHierarchy } from '../../model/common-code-hierarchy';

import { CommonCodeService } from '../../service/common-code.service';

import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd';


@Component({
  selector: 'app-common-code-tree',
  templateUrl: './common-code-tree.component.html',
  styles: ['']
})
export class CommonCodeTreeComponent implements OnInit {

    @ViewChild('treeComponent', {static: false}) treeComponent;
  
    nodeItems: CommonCodeHierarchy[] = [];

    @Input()
    searchValue = '';

    @Output()
    itemSelected = new EventEmitter();

    constructor(private commonCodeService: CommonCodeService) { }

    ngOnInit() {
        console.log('CommonCodeTreeComponent init');
    }

    getCommonCodeHierarchy() {
        this.commonCodeService
            .getCommonCodeHierarchy()
            .subscribe(
                (model: ResponseList<CommonCodeHierarchy>) => {
                    if ( model.total > 0 ) {
                        this.nodeItems = model.data;
                    } else {
                        this.nodeItems = [];
                    }            
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

}
