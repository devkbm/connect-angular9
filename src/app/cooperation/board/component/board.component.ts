import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleGridComponent } from './article-grid.component';
import { BoardFormComponent } from './board-form.component';
import { BoardTreeComponent } from './board-tree.component';
import { ArticleFormComponent } from './article-form.component';
import { Article } from '../model/article';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  /**
   * 게시판 Drawer 여부
   */
  drawerVisible = false;

  /**
   * 게시글 Drawer 여부
   */
  articleDrawerVisible = false;

  articleViewDrawerVisible = false;

  /**
   * 선택된 게시판 키
   */
  selectedBoard;


  selectedArticle: Article;

  /**
   * 게시판 트리 조회 Filter 조건
   */
  queryValue;

  tabTitle;

  @ViewChild('boardTree', {static: true}) boardTree: BoardTreeComponent;
  @ViewChild('boardForm', {static: true}) boardForm: BoardFormComponent;
  @ViewChild('articleGrid', {static: true}) articleGrid: ArticleGridComponent;
  @ViewChild('articleForm', {static: true}) articleForm: ArticleFormComponent;

  constructor() { }

  ngOnInit() {
    this.getBoardTree();
  }

  public setBoardSelect(item): void {
    this.tabTitle = item.title;
    this.selectedBoard = item.key;
    this.getArticleGridData();
  }

  public getArticleGridData(): void {
    this.closeArticleDrawer();
    this.articleGrid.getArticleList(this.selectedBoard);
  }

  public newBoard(): void {
    this.boardForm.newForm();
    this.openDrawer();
  }

  public modifyBoard(item): void {
    this.boardForm.getBoard(item.key);
    this.openDrawer();
  }

  public getBoardTree(): void {
    this.closeDrawer();
    this.boardTree.getboardHierarchy();
  }

  public newArticle(): void {
    this.articleForm.newForm(this.selectedBoard);
    this.openArticleDrawer();
  }

  public validEditable(item) {
    if (item.editable === true) {
      this.editArticle(item);
    } else {
      this.showArticleView(item);
    }
    console.log(item);
  }

  public editArticle(item): void {
    this.articleForm.getArticle(item.pkArticle);
    this.openArticleDrawer();
  }

  public showArticleView(item): void {
    this.selectedArticle = item;
    this.openArticleViewDrawer();
  }

  public print(item): void {
    console.log(item);
  }


  public openDrawer(): void {
    this.drawerVisible = true;
  }

  public closeDrawer(): void {
    this.drawerVisible = false;
  }

  public openArticleDrawer(): void {
    this.articleDrawerVisible = true;
  }

  public closeArticleDrawer(): void {
    this.articleDrawerVisible = false;
  }

  public openArticleViewDrawer(): void {
    this.articleViewDrawerVisible = true;
  }

  public closeArticleViewDrawer(): void {
    this.articleViewDrawerVisible = false;
  }
}
