import { Component ,OnInit } from '@angular/core';
import { AddtodoserviceService } from '../service/addtodoservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent {

  constructor(private add:AddtodoserviceService){
  }
  todos: any[] = [];

  ngOnInit(): void {
    this.getTodoList();
  }
  todoValue: string = '';
  addtodofunc(data:any):void
  {
    this.add.addTodo(data).subscribe((result)=>{
      this.add.showSuccessAlert('Your item Is Successfully Added in Your <b>Todo List</b>');
      this.getTodoList();
      this.todoValue='';
    });
  }

  getTodoList():any {
    this.add.gettodo().subscribe((res:any) => {
      this.todos = res;
    });
  }

  deleteTodoConfirmation(todoId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.deletetodobutton(todoId);
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your todo is safe :)', 'info');
      }
    });
  }

  deletetodobutton(todoId: number): void {
    this.add.deletetodo(todoId).subscribe(() => {
      this.add.showSuccessAlert('Todo deleted successfully');
      // Refresh the todo list after deleting a todo
      this.getTodoList();
    });
  }

}
