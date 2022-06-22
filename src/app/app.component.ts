import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bima-Enote';

  constructor(
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    this.tokenStorage.clearToken();
  }
}
