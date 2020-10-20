import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions, NzModalService } from 'ng-zorro-antd';

import { AppAlarmService } from '../common/service/app-alarm.service';
import { MenuService } from '../common/service/menu.service';

import { MenuGroup } from '../common/model/menu-group';
import { MenuHierarchy } from '../common/model/menu-hierarchy';
import { ResponseList } from '../common/model/response-list';
import { UserSessionService } from '../common/service/user-session.service';
import { UserPopupComponent } from '../common/component/user/user-popup.component';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit  {

  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  selectedValue: string;
  message: string;
  menuGroupCode: string;
  avartarImgSrc;

  menuGroupList: MenuGroup[];
  menuItems: MenuHierarchy[];

  @ViewChild('treeCom', {static: false}) treeCom;

  constructor(private appAlarmService: AppAlarmService,
              private sessionService: UserSessionService,
              private menuService: MenuService,
              private modalService: NzModalService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.appAlarmService.currentMessage.subscribe(message => this.message = message);

    this.setInitMenuGroup();
    this.setAvatar();
  }

  /**
   * 초기 메뉴 그룹을 설정한다.
   */
  private setInitMenuGroup(): void {
    const stringMenuGroupList = sessionStorage.getItem('menuGroupList');
    const selectedMenuGroup   = sessionStorage.getItem('selectedMenuGroup');

    this.menuGroupList = JSON.parse(stringMenuGroupList);

    if ( selectedMenuGroup != null ) {
      this.selectedValue = selectedMenuGroup;
    } else {
      this.selectedValue = this.menuGroupList[0].menuGroupCode;
    }

    if (this.selectedValue != null) {
      this.selectMenuGroup(this.selectedValue);
    }
  }

  sendMen(mess) {
    this.menuGroupCode = mess;
  }

  selectMenuGroup(value: string): void {

    sessionStorage.setItem('selectedMenuGroup', value);

    this.menuService
      .getMenuHierarchy(value)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          if ( model.total > 0 ) {
            this.menuItems = model.data;
          } else {
            this.menuItems = null;
          }

          const seledtedMenu = sessionStorage.getItem('selectedMenu');
          // console.log(this.treeCom);
          // this.treeCom.nzSelectedKeys = [seledtedMenu];
        },
        (err) => {
          // console.log(err);
        },
        () => {
          console.log('메뉴 조회 완료');
        }
      );
  }

  selectMenu(event: NzFormatEmitEvent): void {
    // console.log(event, event.selectedKeys, event.keys, event.nodes);
    // console.log(event.nodes[0].origin);
    const node = event.nodes[0].origin;
    sessionStorage.setItem('selectedMenu', node.key);

    this.router.navigate([node.url]);
  }

  selectMenuItem(url: string): void {
    sessionStorage.setItem('selectedMenu', url);
    // '/home/' +
    this.router.navigate([url]);
  }

  public setAvatar(): void {
    // this.userImageBase64 = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    // const url = sessionStorage.getItem('imageUrl');
    // this.userImageBase64 = `http://localhost:8090/static/${url}`;
    this.avartarImgSrc = this.sessionService.getAvartarImageString();
  }

  public imageClick(args): void {
    const modal = this.modalService.create({
      /*nzTitle: 'Modal Title',*/
      nzTitle: null,
      nzContent: UserPopupComponent,
      nzFooter: null,
      //nzMaskClosable: false,
      //nzClosable: false,
      nzKeyboard: true,
      nzWidth: 400,
      nzStyle: { position: 'absolute', top: '30px', right: '70px', padding: 0, margin: 0 }
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

    modal.open();

  }

}
