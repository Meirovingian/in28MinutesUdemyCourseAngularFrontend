import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { logging } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { AUTHENTICATED_USER_KEY } from '../service/http/basic-authentication.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  id: number;
  todo: Todo;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoService: TodoDataService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date());
    this.refreshTodo(sessionStorage.getItem(AUTHENTICATED_USER_KEY), this.id);
  }

  refreshTodo(username, id) {
    if (id > -1) {
      this.todoService
        .retrieveTodo(username, this.id)
        .subscribe((response) => this.handleSuccessfulResponse(response));
    }
  }

  handleSuccessfulResponse(response) {
    this.todo = response;
  }

  doSave() {
    this.todoService
      .updateTodo(
        sessionStorage.getItem(AUTHENTICATED_USER_KEY),
        this.id,
        this.todo
      )
      .subscribe((response) => this.afterSuccessOnUpdate(response));
  }

  afterSuccessOnUpdate(response) {
    this.router.navigate(['todos']);
  }
}
