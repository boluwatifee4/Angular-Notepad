import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import { Note } from 'src/app/models/note.model';
import { NotesService } from 'src/app/services/notes/notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Path } from 'src/app/utils/paths';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss']
})
export class ViewNotesComponent implements OnInit {
  editNoteForm!: UntypedFormGroup;
  errMsg: string = '';
  note:any = [];
  emptyState:Boolean = false;
  loading:Boolean = false;
  showEditForm:Boolean = false;
   name!: any;
   id:string='';
   constructor(
    private notesService: NotesService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,

  ) { 
    this._route.params.subscribe( params => this.id = params.id );
   }

  ngOnInit(): void {
    this.editNoteForm = this.formBuilder.group({
      // set title to note title
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    })
    this.getNote();
    
    // console.log("id",this.id);
  }
  // get note id from url
  getNote() {
    this.notesService.getNote(this.id).subscribe(
      data => {
        this.note = data.data;
        // set title to note title
        this.editNoteForm.setValue({
          title: this.note.title,
          content: this.note.content,
        })
        // console.log("note",this.note);
      }
   , error => {
      this.errMsg = error.error.message;
    }
    )
  }
  // edit note
  onSubmit() {
    const note: Note = {
      title: this.editNoteForm.value.title,
      content: this.editNoteForm.value.content,
    }
    this.notesService.updateNote(note , this.id).subscribe(
      data => {
        // this.router.navigate([Path.DASHBOARD]);
      }
    , error => {
      this.errMsg = error.error.message;
    }
    )
    this.showEditForm = false;
    this.editNoteForm.reset();
    // refresh notes
    this.getNote();
  }
  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }
  // go back to last history
  goBack() {
    this.router.navigate([Path.DASHBOARD]);
  }

}
