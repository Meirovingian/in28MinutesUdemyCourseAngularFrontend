import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { AUTHENTICATED_USER_KEY } from '../service/http/basic-authentication.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent implements OnInit {
  // todos = [
  //   new Todo(1, "Learn to Dance", false, new Date()),
  //   new Todo(2, "Eat", false, new Date()),
  //   new Todo(3, "Visit Hoa Tuyet", false, new Date())
  // ];
  todos: Todo[];
  message: string = '';

  constructor(private router: Router, private todoService: TodoDataService) {}

  ngOnInit(): void {
    this.refreshTodos();
  }

  handleSuccessfulResponse(response) {
    this.todos = response;
  }

  deleteTodo(id) {
    this.todoService
      .deleteTodo(sessionStorage.getItem(AUTHENTICATED_USER_KEY), id)
      .subscribe((response) => this.afterSuccessOnDelete(response));
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }

  updateTodo(id) {
    this.router.navigate(['todos', id]);
  }

  afterSuccessOnDelete(response) {
    this.message = 'Element has succesfully been deleted !';
    this.refreshTodos();
  }

  refreshTodos() {
    let username: string = sessionStorage.getItem(AUTHENTICATED_USER_KEY);
    this.todoService
      .retrieveEntireTodoList(username)
      .subscribe((response) => this.handleSuccessfulResponse(response));
  }
}
