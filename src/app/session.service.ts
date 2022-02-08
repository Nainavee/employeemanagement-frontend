import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private loggedIn!: boolean;
  constructor() { }

  public isLoggedIn():boolean{
    return this.loggedIn;
  }

  setLoggedIn(isLoggedIn: boolean){
    this.loggedIn = isLoggedIn;
}
}
