import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class TaostsService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 1000,
    });
  }

  openSnackBarWithAction(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
