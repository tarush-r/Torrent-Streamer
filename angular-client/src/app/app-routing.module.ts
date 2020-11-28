import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CardsComponent } from './components/cards/cards.component';
import { EmptyComponent } from './components/empty/empty.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { PlayerComponent } from './components/player/player.component';
import { ProComponent } from './components/pro/pro.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: 'movie-detail', component: MovieDetailComponent},
  {path: 'player', component: PlayerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: '', component: CardsComponent},
  {path: 'pro', component: ProComponent},
  {path: 'empty', component: EmptyComponent},
  {path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MovieDetailComponent]
