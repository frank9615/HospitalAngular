import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavModel } from 'src/app/shared/nav/nav.model';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {


  navbarlinks: NavModel[] = [];
  titlelink: string;

  constructor(private route: Router) {
    this.navbarlinks.push({ header: "Pazienti", link: "patients" });
    this.titlelink = "/doctor/patients";
  }

  ngOnInit(): void {
    this.route.navigate(['/doctor/patients']);
  }

}
