import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Route } from "@angular/router";
import { UsersComponent } from './users.component';

const routes: Route[] = [
  {
    path: '',
    component: UsersComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class UsersRoutingModule {}
