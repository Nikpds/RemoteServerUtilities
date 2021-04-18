import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogsContainerComponent } from './logs-container/logs-container.component';

const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'logs', component: LogsContainerComponent },
  { path: '', redirectTo: 'logs', pathMatch: 'full' },
  { path: '**', redirectTo: 'logs' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
