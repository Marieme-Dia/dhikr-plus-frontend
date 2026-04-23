import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">☪</div>
          <h1 class="auth-title">Dhikr+</h1>
          <p class="auth-subtitle">Créer votre compte</p>
        </div>

        <form (ngSubmit)="onRegister()" class="auth-form">
          <div class="form-group">
            <label>Nom d'affichage</label>
            <input type="text" [(ngModel)]="displayName" name="displayName" placeholder="Votre prénom" />
          </div>
          <div class="form-group">
            <label>Nom d'utilisateur *</label>
            <input type="text" [(ngModel)]="username" name="username"
                   placeholder="ex: ahmed123" required minlength="3" />
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input type="email" [(ngModel)]="email" name="email"
                   placeholder="email@exemple.com" required />
          </div>
          <div class="form-group">
            <label>Mot de passe *</label>
            <input type="password" [(ngModel)]="password" name="password"
                   placeholder="Minimum 6 caractères" required minlength="6" />
          </div>
          <div class="error-msg" *ngIf="errorMsg">{{ errorMsg }}</div>
          <div class="success-msg" *ngIf="successMsg">{{ successMsg }}</div>
          <button type="submit" class="btn btn-primary btn-full" [disabled]="loading">
            {{ loading ? 'Inscription...' : 'Créer mon compte' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Déjà un compte ? <a routerLink="/login">Se connecter</a></p>
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
    .auth-header { text-align: center; margin-bottom: 28px; }
    .auth-logo { font-size: 2.5rem; color: var(--green); }
    .auth-title { font-family: 'Amiri', serif; font-size: 2rem; color: var(--green-dark); margin: 8px 0 4px; }
    .auth-subtitle { color: var(--muted); font-size: 0.88rem; }
    .auth-form { display: flex; flex-direction: column; gap: 14px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group label { font-size: 0.85rem; font-weight: 700; color: var(--text); }
    .btn-full { width: 100%; padding: 14px; font-size: 1rem; margin-top: 8px; }
    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .error-msg { background: #FCEBEB; color: var(--danger); padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; border: 1px solid #F7C1C1; }
    .success-msg { background: var(--green-light); color: var(--green-dark); padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; border: 1px solid #9FE1CB; }
    .auth-footer { text-align: center; margin-top: 24px; color: var(--muted); font-size: 0.88rem; }
    .auth-footer a { color: var(--green); font-weight: 700; text-decoration: none; }
  `]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  displayName = '';
  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  onRegister() {
    if (!this.username || !this.email || !this.password) return;
    this.loading = true;
    this.errorMsg = '';
    this.authService.register({
      username: this.username, email: this.email,
      password: this.password, displayName: this.displayName
    }).subscribe({
      next: () => {
        this.successMsg = 'Compte créé ! Redirection vers la connexion...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
  console.error('Erreur complète:', err);
  if (err.status === 0) {
    this.errorMsg = '⏳ Le serveur démarre (30 sec). Veuillez réessayer...';
  } else if (err.status === 400) {
    this.errorMsg = err.error || 'Données invalides.';
  } else if (err.status === 409) {
    this.errorMsg = 'Nom d\'utilisateur ou email déjà utilisé.';
  } else {
    this.errorMsg = err.error || 'Erreur serveur. Réessayez.';
  }
  this.loading = false;
}
    });
  }
}
