import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'dhikr',
        loadComponent: () => import('./features/dhikr/dhikr.component').then(m => m.DhikrComponent)
      },
      {
        path: 'audio',
        loadComponent: () => import('./features/audio/audio.component').then(m => m.AudioComponent)
      },
      {
        path: 'prayer',
        loadComponent: () => import('./features/prayer/prayer.component').then(m => m.PrayerComponent)
      },
      {
        path: 'learn',
        loadComponent: () => import('./features/learn/learn.component').then(m => m.LearnComponent)
      },
      {
        path: 'stats',
        loadComponent: () => import('./features/stats/stats.component').then(m => m.StatsComponent)
      }
    ]
  },
  { path: '**', redirectTo: '/home' }
];
