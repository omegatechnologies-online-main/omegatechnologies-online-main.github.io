import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { Team } from './team/team';
import { Stories } from './stories/stories';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contact', component: Contact },
  { path: 'team', component: Team },
  { path: 'stories', component: Stories },
  { path: '**', redirectTo: '' }
];
