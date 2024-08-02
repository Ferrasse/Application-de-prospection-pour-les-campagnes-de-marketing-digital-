import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service_videos_processing/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username:string | undefined;
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    if(!this.loginService.getIsLogged()){
      this.router.navigate(['/']);
    }
    else{
    this.username=this.loginService.getUsername();
    }
  }

  logout(){
    this.loginService.logout()
  }

}