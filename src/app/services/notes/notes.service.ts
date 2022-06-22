import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from 'src/app/utils/endPoints';
import { Note } from 'src/app/models/note.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
    // withCredentials: true
}
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor( private http : HttpClient ) { }

  createNote(note: Note): Observable<any> {
    return this.http.post(Endpoints.NOTES, note, httpOptions);
  }

  getNotes(): Observable<any> {
    return this.http.get(Endpoints.NOTES, httpOptions);
  }

  deleteNote(id: string): Observable<any> {
    return this.http.delete(Endpoints.NOTES  + id, httpOptions);
  }

  updateNote(note: Note, note_id: string): Observable<any> {
    return this.http.put(Endpoints.NOTES + note_id, note, httpOptions);
  }

  getNote(id: string): Observable<any> {
    return this.http.get(Endpoints.NOTES + id, httpOptions);
  }

}
