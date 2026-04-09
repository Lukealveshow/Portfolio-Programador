import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { BlogComponent } from './pages/blog/blog';
import { ArtigoComponent } from './pages/artigo/artigo';
import { AboutComponent } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  {path: 'artigo/:slug', component: ArtigoComponent},
  {path: 'about', component: AboutComponent},
  { path: '**', redirectTo: '' }
];