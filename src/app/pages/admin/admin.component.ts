import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  usersList: User[] = [];
  headersUsersList: string[] = [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.usersList = users;
        this.headersUsersList = Object.getOwnPropertyNames(users[0]);
      }
    );
  }

}
