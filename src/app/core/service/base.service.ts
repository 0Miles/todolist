import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from '../../../environments/environment'
import { TodoCategory } from '../model/todo-category.model';
import { TodoItem } from '../model/todo-item.model';
import { Jsonbin } from './jsonbin.model';

export interface Data {
  lastUpdate: string;
  todoListData: Array<TodoCategory>;
}

@Injectable()

export class BaseService {

  todoListData: Array<TodoCategory> = [
    {
      id: 'inbox',
      title: 'inbox',
      color: 'white',
      todoItems: []
    }
  ];

  activeCategory: TodoCategory = this.todoListData[0];
  jsonbin: Jsonbin;

  constructor(private http: HttpClient) {
    this.jsonbin = new Jsonbin(this.http, environment.jsonbin.token)
    this.loadLocalData();
    this.setActiveCategory(0);
    this.sync();
  }

  sync() {
    // 同步本地與jsonbin上的資料
    this.jsonbin.get()
      .subscribe(
        (data: Data) => {
          // 判斷是否有本地資料
          if (localStorage.getItem('lastUpdate') && localStorage.getItem('todoListData')) {

            // 比對本地資料與jsonbin的最後更新時間，並更新資料
            const jsonbinUpdateDate: Date = new Date(data.lastUpdate);
            const localUpdateDate: Date = new Date(localStorage.getItem('lastUpdate'));

            if (jsonbinUpdateDate > localUpdateDate) {
              this.todoListData = data.todoListData;
            } else {
              this.loadLocalData();
              this.updateJsonbin();
            }
          } else {
            // 若本地資料不存在，使用來自jsonbin的資料
            this.todoListData = data.todoListData;
          }
        },response => {
          this.updateJsonbin();
        },() => {
          this.setActiveCategory(0);
        }
      );
  }

  // 更新jsonbin上的資料
  updateJsonbin() {
    const lastUpdate: string = localStorage.getItem('lastUpdate');
    const data: Data = { 'lastUpdate': lastUpdate, 'todoListData': this.todoListData }

    this.jsonbin.post(data).subscribe();
  }

  // 將todoListData儲存在localStorage，並同步至jsonbin
  saveLocalData() {
    localStorage.setItem('todoListData', JSON.stringify(this.todoListData));
    localStorage.setItem('lastUpdate', (new Date()).toISOString()); // refresh LastUpdate
    this.sync();
  }

  loadLocalData() {
    if(localStorage.getItem('todoListData')){
      this.todoListData = JSON.parse(localStorage.getItem('todoListData'));
    }
  }

  // 設定TodoList目前存取分類
  setActiveCategory(category: number | TodoCategory) {
    if (typeof (category) === 'number') {
      this.activeCategory = this.todoListData[category];
    } else {
      this.activeCategory[this.todoListData.indexOf(category)];
    }
  }

  pushTodoItem(item: TodoItem, category: TodoCategory=this.activeCategory) {
    category.todoItems.push(item);
    this.saveLocalData();
  }

  deleteTodoItem(item: TodoItem, category: TodoCategory = this.activeCategory) {
    category.todoItems.splice(category.todoItems.indexOf(item), 1);
    this.saveLocalData();
  }

  clearCompleted(category: TodoCategory = this.activeCategory) {
    category.todoItems = category.todoItems.filter(todo => todo.completed == false);
    this.saveLocalData();
  }
}
