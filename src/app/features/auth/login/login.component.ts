import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">☪</div>
          <h1 class="auth-title">Dhikr+</h1>
          <p class="auth-subtitle">Connexion à votre espace spirituel</p>
        </div>

        <form (ngSubmit)="onLogin()" class="auth-form">
          <div class="form-group">
            <label>Nom d'utilisateur</label>
            <input type="text" [(ngModel)]="username" name="username"
                   placeholder="Votre nom d'utilisateur" required />
          </div>
          <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" [(ngModel)]="password" name="password"
                   placeholder="••••••••" required />
          </div>
          <div class="error-msg" *ngIf="errorMsg">{{ errorMsg }}</div>
          <button type="submit" class="btn btn-primary btn-full" [disabled]="loading">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Pas encore de compte ? <a routerLink="/register">S'inscrire</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--green-dark) 0%, #1D9E75 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .auth-card {
      background: #fff;
      border-radius: 20px;
      padding: 40px 36px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    }
    .auth-header { text-align: center; margin-bottom: 32px; }
    .auth-logo { font-size: 2.5rem; color: var(--green); }
    .auth-title {
      font-family: 'Amiri', serif;
      font-size: 2rem;
      color: var(--green-dark);
      margin: 8px 0 4px;
    }
    .auth-subtitle { color: var(--muted); font-size: 0.88rem; }
    .auth-form { display: flex; flex-direction: column; gap: 16px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group label { font-size: 0.85rem; font-weight: 700; color: var(--text); }
    .btn-full { width: 100%; padding: 14px; font-size: 1rem; margin-top: 8px; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .error-msg {
      background: #FCEBEB;
      color: var(--danger);
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.85rem;
      border: 1px solid #F7C1C1;
    }
    .auth-footer { text-align: center; margin-top: 24px; color: var(--muted); font-size: 0.88rem; }
    .auth-footer a { color: var(--green); font-weight: 700; text-decoration: none; }
    .auth-footer a:hover { text-decoration: underline; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  onLogin() {
    if (!this.username || !this.password) return;
    this.loading = true;
    this.errorMsg = '';
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.toast.show('Bienvenue ! Connexion réussie ✅');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMsg = 'Identifiants incorrects. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }
}
