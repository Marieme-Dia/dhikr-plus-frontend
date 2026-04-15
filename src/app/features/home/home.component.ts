import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { StatsService } from '../../core/services/stats.service';
import { StatsResponse } from '../../core/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container animate-in">

      <!-- Hero -->
      <div class="hero-banner">
        <div class="hero-content">
          <div class="hero-bismillah arabic">بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <h2 class="hero-greeting">Salam, {{ user?.displayName || 'Frère/Sœur' }} 👋</h2>
          <p class="hero-sub">Que votre journée soit remplie de bénédictions</p>
        </div>
        <div class="hero-streak">
          <div class="streak-num">{{ stats?.streakDays || 1 }}</div>
          <div class="streak-label">Jour(s) consécutifs</div>
        </div>
      </div>

      <!-- Stats rapides -->
      <div class="stats-row">
        <div class="stat-pill">
          <span class="stat-pill-num">{{ stats?.totalDhikrs || 0 }}</span>
          <span class="stat-pill-label">Dhikrs total</span>
        </div>
        <div class="stat-pill">
          <span class="stat-pill-num">{{ stats?.completedSessions || 0 }}</span>
          <span class="stat-pill-label">Sessions</span>
        </div>
        <div class="stat-pill">
          <span class="stat-pill-num">{{ stats?.completedLessons || 0 }}</span>
          <span class="stat-pill-label">Leçons</span>
        </div>
        <div class="stat-pill">
          <span class="stat-pill-num">{{ stats?.learnedLetters || 0 }}/28</span>
          <span class="stat-pill-label">Lettres</span>
        </div>
      </div>

      <!-- Navigation rapide -->
      <p class="section-title">Commencer</p>
      <div class="quick-grid">
        <a routerLink="/dhikr" class="quick-card">
          <span class="quick-card-icon">📿</span>
          <div class="quick-card-body">
            <div class="quick-card-title">Compteur Dhikr</div>
            <div class="quick-card-sub">Subhan Allah, Alhamdulillah...</div>
          </div>
          <span class="quick-card-arrow">→</span>
        </a>
        <a routerLink="/audio" class="quick-card">
          <span class="quick-card-icon">🎧</span>
          <div class="quick-card-body">
            <div class="quick-card-title">Écouter le Coran</div>
            <div class="quick-card-sub">Sourates & Invocations</div>
          </div>
          <span class="quick-card-arrow">→</span>
        </a>
        <a routerLink="/learn" class="quick-card">
          <span class="quick-card-icon" style="font-family:'Amiri',serif;font-size:1.6rem;color:var(--green-dark)">أ</span>
          <div class="quick-card-body">
            <div class="quick-card-title">Alphabet arabe</div>
            <div class="quick-card-sub">Apprendre les 28 lettres</div>
          </div>
          <span class="quick-card-arrow">→</span>
        </a>
        <a routerLink="/prayer" class="quick-card">
          <span class="quick-card-icon">🕌</span>
          <div class="quick-card-body">
            <div class="quick-card-title">Horaires prières</div>
            <div class="quick-card-sub">Fajr, Dhuhr, Asr, Maghrib, Isha</div>
          </div>
          <span class="quick-card-arrow">→</span>
        </a>
        <a routerLink="/stats" class="quick-card">
          <span class="quick-card-icon">📊</span>
          <div class="quick-card-body">
            <div class="quick-card-title">Mes statistiques</div>
            <div class="quick-card-sub">Voir ma progression</div>
          </div>
          <span class="quick-card-arrow">→</span>
        </a>
      </div>

      <!-- Hadith du jour -->
      <p class="section-title">Hadith du jour</p>
      <div class="hadith-card">
        <div class="hadith-arabic arabic">سُبْحَانَ اللهِ وَبِحَمْدِهِ</div>
        <p class="hadith-text">
          "Quiconque dit chaque matin et soir 'Gloire à Allah et Louange à Lui' cent fois,
          personne n'arrivera au Jour de la Résurrection avec quelque chose de meilleur..."
        </p>
        <span class="hadith-source">— Sahih Muslim</span>
      </div>

    </div>
  `,
  styles: [`
    .hero-banner {
      background: linear-gradient(135deg, var(--green-dark) 0%, #1D9E75 100%);
      border-radius: var(--radius-lg);
      padding: 28px 24px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 16px;
    }
    .hero-bismillah { font-size: 1.3rem; color: rgba(255,255,255,0.85); margin-bottom: 8px; }
    .hero-greeting { font-size: 1.2rem; font-weight: 700; margin-bottom: 4px; }
    .hero-sub { font-size: 0.82rem; opacity: 0.8; }
    .hero-streak { text-align: center; flex-shrink: 0; }
    .streak-num { font-size: 2.8rem; font-weight: 800; color: var(--gold); line-height: 1; }
    .streak-label { font-size: 0.72rem; opacity: 0.85; margin-top: 4px; }

    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 8px; }
    .stat-pill {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 14px 10px;
      text-align: center;
    }
    .stat-pill-num { display: block; font-size: 1.5rem; font-weight: 800; color: var(--green); }
    .stat-pill-label { font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }

    .quick-grid { display: flex; flex-direction: column; gap: 10px; }
    .quick-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 16px 18px;
      display: flex;
      align-items: center;
      gap: 16px;
      text-decoration: none;
      color: var(--text);
      transition: all 0.2s;
    }
    .quick-card:hover {
      border-color: var(--green);
      transform: translateX(4px);
      box-shadow: 0 2px 12px rgba(29,158,117,0.1);
    }
    .quick-card-icon { font-size: 1.8rem; flex-shrink: 0; width: 40px; text-align: center; }
    .quick-card-body { flex: 1; }
    .quick-card-title { font-weight: 700; font-size: 0.95rem; }
    .quick-card-sub { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }
    .quick-card-arrow { color: var(--green); font-size: 1.1rem; font-weight: 700; }

    .hadith-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-left: 4px solid var(--green);
      border-radius: var(--radius-md);
      padding: 20px;
    }
    .hadith-arabic { font-size: 1.4rem; color: var(--green-dark); margin-bottom: 12px; }
    .hadith-text { font-size: 0.88rem; color: var(--text); line-height: 1.7; margin-bottom: 10px; }
    .hadith-source { font-size: 0.78rem; color: var(--muted); font-style: italic; }

    @media (max-width: 500px) {
      .stats-row { grid-template-columns: repeat(2, 1fr); }
      .hero-banner { flex-direction: column; text-align: center; }
    }
  `]
})
export class HomeComponent implements OnInit {
  user;
  stats: StatsResponse | null = null;

  constructor(private authService: AuthService, private statsService: StatsService) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.statsService.getMyStats().subscribe({
      next: (s) => this.stats = s,
      error: () => {}
    });
  }
}
