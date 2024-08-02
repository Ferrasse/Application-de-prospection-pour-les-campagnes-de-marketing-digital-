import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service_videos_processing/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service_videos_processing/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  logout(){
    this.loginService.logout()
  }

  constructor(private loginService:LoginService, private router:Router,private userService: UserService) { }
  isLoading = true;
  showContent = false;
  username:string | undefined;
  ngOnInit(): void {
    if(!this.loginService.getIsAdmin()){
      this.router.navigate(['/authentication/login-1'])
    }
     // Simulate loading time
     this.loadData();
     if(!this.loginService.getIsLogged()){
      this.router.navigate(['/']);
    }
    else{
    this.username=this.loginService.getUsername();
    }
    }
    loadData() {
      // Simulate an asynchronous data loading operation
      setTimeout(() => {
        this.loadUsers();
        this.isLoading = false;
        this.showContent = true;
      }, 500);
  }
  users: User[] = [];
  totalUsers: number = 0;


  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.totalUsers = data.length;
    });
  }

}