import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/service_videos_processing/login.service';
import { UserService } from 'src/app/service_videos_processing/user.service';

@Component({
  selector: 'app-commonlayoutadmin',
  templateUrl: './commonlayoutadmin.component.html',
  styleUrls: ['./commonlayoutadmin.component.css']
})
export class CommonlayoutadminComponent {

  users: User[];


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
        this.isLoading = false;
        this.showContent = true;
      }, 500);
      this.userService.getUsers().subscribe(data => {
        this.users = data;
      });
  }
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
 

}
