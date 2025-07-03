import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private userRole: string | null = null;

  login(role: string) {
    this.loggedIn = true;
    this.userRole = role;
  }

  logout() {
    this.loggedIn = false;
    this.userRole = null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getRole(): string | null {
    return this.userRole;
  }
}
