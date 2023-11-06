import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  constructor(private router: Router) {}

  onSubmit(): void {
    const username = document.getElementById('username') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    // const usernameError = document.getElementById('usernameerror');
    const usernameError: HTMLElement = document.getElementById('usernameerror')!;
    const passwordError: HTMLElement = document.getElementById('passworderror')!;
    // Reset error flags

    if (username?.value === 'guiwei' && password?.value === 'Test123') {
      // Redirect to Registration page
      this.router.navigate(['/registration']);
    } else {
      // Set error flags based on validation
      if (username?.value !== 'guiwei') {
        usernameError.style.display = 'block';
        username.value="";
      }
      
      if (password?.value !== 'Test123') {
        passwordError.style.display = 'block';
        password.value="";
      }
    }
  }

  explore(): void {
    window.location.href = 'https://learning-ssp.lmx.ai/';
  }
  ngOnInit() {
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'visible';
  }
}
