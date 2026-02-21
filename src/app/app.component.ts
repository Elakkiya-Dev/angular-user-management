import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'angular-user-management';
  selectAll: boolean = false;
  users: User[] = [];
  selectedUsers: any[] = [];

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log('users - ', this.users);
      },
      error: (err) => console.log(err),
      complete: () => console.log('API Called')
    })
  }

  toggleSelectAll(){
    this.selectedUsers = [];

    if(this.selectAll){
      this.selectedUsers = this.users.map(user => user.id);
    }
  }
  toggleUserSelection(userId: number){
    if(this.selectedUsers.includes(userId)){
      this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
    }else{
      this.selectedUsers.push(userId);
    }
    this.selectAll = this.selectedUsers.length === this.users.length;
  }
  editUser(user: any){
    const newName = prompt('Enter your new name: ', user.name);
    if(newName){
      user.name = newName;
    }

  }
  deleteUser(user: any){
    this.selectedUsers = this.selectedUsers.filter(id => id !== user.id);
    this.users = this.users.filter(u => u.id !== user.id);
    this.selectAll = this.selectedUsers.length === this.users.length;
  }
}
