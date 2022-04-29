import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;
  constructor(
    private route: Router,
    private authService: AuthService) {
    this.username = '';
    this.password = '';
    this.error = '';
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          switch (data.role) {
            case 'ADMIN':
              this.route.navigate(['/admin']);
              break;
            case 'OPERATOR':
              this.route.navigate(['/operator']);
              break;
            case 'DOCTOR':
              this.route.navigate(['/doctor']);
              break;
            default:
              this.error = 'Invalid credentials';
          }
        },
        (error) => {
          this.error = "Invalid username or password";
        }
      )

  }

}
