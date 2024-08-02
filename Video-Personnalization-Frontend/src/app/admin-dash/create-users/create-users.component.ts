import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/service_videos_processing/login.service';
import { UserService } from 'src/app/service_videos_processing/user.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent {

  users: User[] = [];
  createUserForm: FormGroup;

  logout(){
    this.loginService.logout()
  }

  constructor(private loginService:LoginService, private router:Router,private userService: UserService,private fb: FormBuilder,
    private modalService: NzModalService) { this.createUserForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
}
  
  isLoading = true;
  showContent = false;
  username:string | undefined;
  ngOnInit(): void {
    this.loadUsers();
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
    loadUsers() {
      this.userService.getUsers().subscribe(data => {
        this.users = data;
        this.isLoading = false;
        this.showContent = true;
      }, error => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      });
    }
  
    deleteUser(id: number) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
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
  // deleteUser(id: number): void {
  //   this.userService.deleteUser(id).subscribe(() => {
  //     this.users = this.users.filter(user => user.id !== id);
  //   });
  // }
 
  createNewClient(newUserAccount: TemplateRef<{}>): void {
    this.modalService.create({
      nzTitle: 'Create New Custumer',
      nzContent: newUserAccount,
      nzFooter: null,
      nzWidth: 620
    });
  }
  onSubmitForm(): void {
    
    if (this.createUserForm.valid) {
      this.userService.createUser(this.createUserForm.value).subscribe(() => {
        this.modalService.closeAll(); // Fermer tous les modals
        this.loadUsers(); // Recharger la liste des utilisateurs
        
      });
    }
  }
}
