import { Component, OnInit } from '@angular/core';
import { BaseService } from '../../core/service/base.service';
import { TodoCategory } from '../../core/model/todo-category.model';

@Component({
  selector: 'nav-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  enableAddBox: boolean = false;
  tmpCategory: TodoCategory;

  constructor(private base: BaseService) { }

  ngOnInit() {
  }
  onChangeActive(category: TodoCategory) {
    this.base.setActiveCategory(category);
  }
  onDeleteCategory(category: TodoCategory) {
    this.base.deleteCategory(category);
  }
  closeAddBox() {
    this.enableAddBox = false;
  }
  submitAddBox() {
    this.base.pushCategory(this.tmpCategory);
    this.enableAddBox = false;
  }
  showAddBox() {
    this.tmpCategory = new TodoCategory('New Category', '#eeeeee');
    this.enableAddBox = true;
  }

}
