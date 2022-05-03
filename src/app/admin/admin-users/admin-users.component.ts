import { Component, OnInit } from '@angular/core';
import { NavModel } from 'src/app/shared/nav/nav.model';
import { User } from 'src/app/core/models/User';
import { UsersService } from 'src/app/core/services/users.service';
import { first } from 'rxjs';
import { DataTableActions } from 'src/app/shared/mytable/table.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  usersList: User[] = [];
  headersUsersList: string[] = [];
  actions: DataTableActions[] = [];

  constructor(
    private userService: UsersService,
    private router: Router) {
    this.actions = [{
      label: 'Delete',
      actionIdToReturn: 'delete',
      icon: 'bi bi-trash'
    },
    {
      label: 'Edit',
      actionIdToReturn: 'edit',
      icon: 'bi bi-pencil'
    }];
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.usersList = users;
        this.headersUsersList = Object.getOwnPropertyNames(users[0]);
      }
    );
  }

  eventcatcher(value: any): void {
    let objvalue: any = JSON.parse(JSON.stringify(value));
    let actionIdToReturn: string = objvalue.actionType;
    console.log(actionIdToReturn);
    switch (actionIdToReturn) {
      case 'delete': {
        const id = objvalue.data.id;
        console.log(id)
        this.userService.deleteUser(id).pipe(first()).subscribe(
          (user: User) => {
            this.usersList = this.usersList.filter((u) => u.id !== id);
          }
        );
        break;
      }
      case 'edit': {
        this.router.navigate(['/users/edit', objvalue.data.id]);
        break;
      }
    }
  }
}
