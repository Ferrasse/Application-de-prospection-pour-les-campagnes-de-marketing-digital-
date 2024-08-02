// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { LoginService } from 'src/app/service_videos_processing/login.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   title = 'keycloak-angular';
//   form!: FormGroup;
//   error: boolean =false

//     constructor(
//         private formBuilder: FormBuilder,
//         private route: ActivatedRoute,
//         private router: Router,
//         private loginService: LoginService,
//     ) { }

//     ngOnInit() {
//         this.form = this.formBuilder.group({
//             username: ['', Validators.required],
//             password: ['', Validators.required]
//         });
//     }

//     // convenience getter for easy access to form fields
//     get f() { return this.form.controls; }

//     login(){
//         this.loginService.login(this.form.value.username,this.form.value.password)
//         .subscribe({
//             next: (res: any) => {
//               localStorage.setItem("token", res.access_token);
//               this.router.navigate(['/admin']);
//             },
//             error: (err) => {
//               this.error=true
//             },
//           });
//     }
// }