import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes/notes.service';
import { Path } from 'src/app/utils/paths';
import { Router, ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { TaostsService } from 'src/app/services/toast/taosts.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
public createNoteForm!: UntypedFormGroup;
errMsg: string = '';
notes:any = [];
emptyState:Boolean = false;
loading:Boolean = false;
openForm:Boolean = false;
greetings: string = '';
 name!: any;
  constructor(
    private notesService: NotesService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private taostsService: TaostsService
  ) {
    // this._route.params.subscribe( params => console.log(params) );
   }

  ngOnInit(): void {
    this.createNoteForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    })
    this.getNotes();
    this.greeting();
    // get first name from local storage
    this.name = localStorage.getItem('first_name');

    
  }

  openSnackBar(message: string) {
    this.taostsService.openSnackBar(message);
  }
  onSubmit() {
    const note: Note = {
      title: this.createNoteForm.value.title,
      content: this.createNoteForm.value.content,
    }
    this.notesService.createNote(note).subscribe(
      data => {
        this.getNotes();
        this.openSnackBar('Note created successfully');
        this.emptyState = false;
        // this.router.navigate([Path.DASHBOARD]);
      }
    , error => {
      this.errMsg = error.error.message;
      this.openSnackBar('Error creating note');
    }
    )
    this.openForm = false;
    this.createNoteForm.reset();
    // refresh notes
    this.getNotes();
  }

  getNotes() {
    this.loading = true;
    this.notesService.getNotes().subscribe(
      data => {
        this.notes = data.data;
        // this.name = this.notes.user.first_name;
        this.loading = false;
        // if notes is empty set emptyState true
        if (this.notes.length === 0) {
          this.emptyState = true;
        }
        // console.log(this.name);
      }
    , error => {
      this.errMsg = error.error.message;
      this.loading = true;
    }
    )
  }

  deleteNote(id: string) {
    this.notesService.deleteNote(id).subscribe(
      data => {
        this.getNotes();
        this.openSnackBar('Note deleted successfully');
      }
    , error => {
      this.errMsg = error.error.message;
      this.openSnackBar('Error deleting note');
    }
    )
  }

  editNote(id: string) {
    this.router.navigate([Path.EDIT_NOTE], {
      relativeTo: this._route,
      queryParams: {
        id: id
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate([]);
  }

  viewNote(id: string) {
    this.router.navigate([`dashboard/${id}`]);
  }

  openFormModal() {
    this.openForm = !this.openForm;
  }
  greeting() {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
      this.greetings = 'Good Morning';
    } else if (hour < 18) {
      this.greetings = 'Good Afternoon ';
    } else {
      this.greetings = 'Good Evening' ;
    }
  }

  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }
}
