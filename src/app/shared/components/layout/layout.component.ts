import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <!-- TOP NAVBAR desktop -->
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="brand-icon">☪</span>
        <span class="brand-name">Dhikr+</span>
      </div>
      <div class="navbar-links">
        <a routerLink="/home"    routerLinkActive="active" class="nav-link"><span>🏠</span> Accueil</a>
        <a routerLink="/dhikr"  routerLinkActive="active" class="nav-link"><span>📿</span> Dhikr</a>
        <a routerLink="/audio"  routerLinkActive="active" class="nav-link"><span>🎧</span> Audio</a>
        <a routerLink="/prayer" routerLinkActive="active" class="nav-link"><span>🕌</span> Prières</a>
        <a routerLink="/learn"  routerLinkActive="active" class="nav-link"><span>📖</span> Apprendre</a>
        <a routerLink="/stats"  routerLinkActive="active" class="nav-link"><span>📊</span> Stats</a>
      </div>
      <div class="navbar-user">
        <span class="user-name">{{ user?.displayName }}</span>
        <button class="btn-logout" (click)="logout()">Déconnexion</button>
      </div>
    </nav>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <!-- BOTTOM NAV mobile -->
    <nav class="bottom-nav">
      <a routerLink="/home"    routerLinkActive="bnav-active" class="bnav-item">
        <span class="bnav-icon">🏠</span>
        <span class="bnav-label">Accueil</span>
      </a>
      <a routerLink="/dhikr"  routerLinkActive="bnav-active" class="bnav-item">
        <span class="bnav-icon">📿</span>
        <span class="bnav-label">Dhikr</span>
      </a>
      <a routerLink="/prayer" routerLinkActive="bnav-active" class="bnav-item bnav-center">
        <span class="bnav-icon">🕌</span>
        <span class="bnav-label">Prières</span>
      </a>
      <a routerLink="/learn"  routerLinkActive="bnav-active" class="bnav-item">
        <span class="bnav-icon">📖</span>
        <span class="bnav-label">Apprendre</span>
      </a>
      <a routerLink="/stats"  routerLinkActive="bnav-active" class="bnav-item">
        <span class="bnav-icon">📊</span>
        <span class="bnav-label">Stats</span>
      </a>
    </nav>
  `,
  styles: [`
    /* ════ TOP NAVBAR ════ */
    .navbar {
      background: var(--green-dark);
      display: flex; align-items: center;
      padding: 0 24px; height: 60px;
      position: sticky; top: 0; z-index: 100;
      box-shadow: 0 2px 12px rgba(0,0,0,0.22);
      gap: 20px;
    }
    .navbar-brand { display:flex; align-items:center; gap:8px; flex-shrink:0; }
    .brand-icon { font-size:1.2rem; color:var(--gold); }
    .brand-name { font-family:'Amiri',serif; font-size:1.3rem; color:#fff; font-weight:700; }
    .navbar-links { display:flex; align-items:center; gap:2px; flex:1; overflow-x:auto; scrollbar-width:none; }
    .navbar-links::-webkit-scrollbar { display:none; }
    .nav-link {
      display:flex; align-items:center; gap:5px;
      padding:8px 11px; border-radius:8px;
      text-decoration:none; color:rgba(255,255,255,0.65);
      font-size:0.8rem; font-weight:600; white-space:nowrap;
      transition:all 0.2s;
    }
    .nav-link:hover { color:#fff; background:rgba(255,255,255,0.08); }
    .nav-link.active { color:#fff; background:rgba(255,255,255,0.15); border-bottom:2px solid var(--gold); }
    .navbar-user { display:flex; align-items:center; gap:12px; flex-shrink:0; }
    .user-name { color:rgba(255,255,255,0.8); font-size:0.82rem; font-weight:600; }
    .btn-logout {
      background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2);
      color:#fff; padding:6px 14px; border-radius:8px; cursor:pointer;
      font-size:0.78rem; font-weight:600; font-family:'Nunito',sans-serif; transition:all 0.2s;
    }
    .btn-logout:hover { background:rgba(255,255,255,0.22); }

    .main-content { min-height: calc(100vh - 60px); }

    /* ════ BOTTOM NAV (mobile) ════ */
    .bottom-nav {
      display: none;
      position: fixed; bottom:0; left:0; right:0;
      background: #fff;
      border-top: 1.5px solid var(--border);
      z-index: 300;
      padding: 4px 8px calc(4px + env(safe-area-inset-bottom));
      box-shadow: 0 -4px 24px rgba(0,0,0,0.1);
      justify-content: space-around;
    }
    .bnav-item {
      flex: 1; display:flex; flex-direction:column;
      align-items:center; gap:2px;
      text-decoration:none; color:var(--muted);
      padding:6px 2px; border-radius:10px;
      transition:all 0.2s;
      font-size:0.62rem; font-weight:700; letter-spacing:0.02em;
      max-width: 72px;
    }
    .bnav-item.bnav-active { color:var(--green); }
    .bnav-item.bnav-active .bnav-icon { transform:translateY(-3px) scale(1.15); }
    .bnav-center {
      background: var(--green);
      border-radius: 14px;
      padding: 4px 12px;
      color: #fff !important;
      margin-top: -10px;
      box-shadow: 0 4px 16px rgba(29,158,117,0.35);
    }
    .bnav-center.bnav-active { color:#fff !important; background:var(--green-dark); }
    .bnav-center .bnav-icon { color:#fff !important; }
    .bnav-icon { font-size:1.4rem; transition:transform 0.2s; display:block; line-height:1.1; }
    .bnav-label { display:block; }

    /* Show on mobile */
    @media (max-width: 700px) {
      .navbar { display:none; }
      .bottom-nav { display:flex; }
      .main-content { padding-bottom: 72px; }
    }
  `]
})
export class LayoutComponent {
  user: any;
  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getCurrentUser();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
