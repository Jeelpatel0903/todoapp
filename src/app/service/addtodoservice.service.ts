import { Injectable } from '@angular/core';
import { HttpClient } from'@angular/common/http';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AddtodoserviceService {
  private apiUrl = 'http://localhost:3000/todolist';


  constructor(private http:HttpClient) { }

  addTodo(data:any){
    return this.http.post("http://localhost:3000/todolist",data)
  }

  gettodo():any
  {
    return this.http.get("http://localhost:3000/todolist");
  }

  deletetodo(todoid: number):any{
    const url = `${this.apiUrl}/${todoid}`;
    return this.http.delete(url)
  }

  showSuccessAlert(message: string): void {
    Swal.fire('Success', message, 'success');
  }



}
