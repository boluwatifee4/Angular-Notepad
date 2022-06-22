import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// layouts
import { AuthComponent } from './layout/auth/auth.component';
import { PagesComponent } from './layout/pages/pages.component';
import { Path } from './utils/paths';

// auth views
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';

// pages views
import { DashboardComponent } from './views/pages/dashboard/dashboard.component';
import { CreateNoteComponent } from './views/pages/create-note/create-note.component';
import { ViewNotesComponent } from './views/pages/view-notes/view-notes.component';

const routes: Routes = [
  {path: "", component: LoginComponent, pathMatch: "full"},
  {path: Path.REGISTER, component: RegisterComponent},
  {path: Path.DASHBOARD, component: DashboardComponent, canActivate: [AuthGuard]},
  // {path: Path.CREATE_NOTE, component: CreateNoteComponent},
  {path: 'dashboard/:id', component: ViewNotesComponent, canActivate: [AuthGuard]},
  // auth views
  // { path: Path.AUTH, component: AuthComponent, 
  //   children: [
  //     { path: Path.LOGIN, component: LoginComponent },
  //     { path: Path.REGISTER, component: RegisterComponent },
  //   ]
  // },

  // { path: "", redirectTo: "pages", pathMatch: "full" },
  // { path: "**", redirectTo: "login", pathMatch: "full" },

  // // pages views

  // { path: Path.DASHBOARD, component: PagesComponent,
  //   children: [
  //     { path: Path.HOME, component: DashboardComponent },
  //   ]
  // },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
