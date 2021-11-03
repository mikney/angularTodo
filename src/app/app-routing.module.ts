import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {MainLayoutComponent} from "./main-layout/main-layout.component";

const routes: Routes = [
  {path: 'login', component: LoginPageComponent },
  {path: '',  component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/folder/all', pathMatch: 'full'},
      {path: 'folder/:id', component: TodoListComponent}
    ]},
  {path: '**', redirectTo: '/folder/all'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
