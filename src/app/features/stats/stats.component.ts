import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsService } from '../../core/services/stats.service';
import { StatsResponse } from '../../core/models/models';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-in">

      <div *ngIf="loading" class="spinner"></div>

      <ng-container *ngIf="!loading && stats">

        <!-- Big metrics -->
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-num">{{ stats.totalDhikrs }}</div>
            <div class="metric-label">Total Dhikrs</div>
          </div>
          <div class="metric-card">
            <div class="metric-num">{{ stats.completedSessions }}</div>
            <div class="metric-label">Sessions complètes</div>
          </div>
          <div class="metric-card">
            <div class="metric-num">{{ stats.learnedLetters }}/28</div>
            <div class="metric-label">Lettres apprises</div>
          </div>
          <div class="metric-card">
            <div class="metric-num">{{ stats.completedLessons }}</div>
            <div class="metric-label">Leçons finies</div>
          </div>
        </div>

        <!-- Streak -->
        <div class="streak-card">
          <div class="streak-flame">🔥</div>
          <div class="streak-body">
            <div class="streak-title">Série en cours</div>
            <div class="streak-sub">Continuez chaque jour !</div>
          </div>
          <div class="streak-count">
            <span class="streak-num">{{ stats.streakDays }}</span>
            <span class="streak-unit">jour{{ stats.streakDays > 1 ? 's' : '' }}</span>
          </div>
        </div>

        <!-- Weekly bar chart -->
        <p class="section-title">📊 Dhikrs — 7 derniers jours</p>
        <div class="chart-card">
          <div class="bar-chart">
            <div *ngFor="let day of stats.weeklyStats; let last = last"
                 class="bar-col">
              <span class="bar-val">{{ day.count || '' }}</span>
              <div class="bar-wrap">
                <div class="bar"
                     [style.height.px]="barHeight(day.count)"
                     [class.bar-today]="last"></div>
              </div>
              <span class="bar-label">{{ day.day }}</span>
            </div>
          </div>
        </div>

        <!-- Alphabet progress -->
        <p class="section-title">📖 Progression alphabet</p>
        <div class="card" style="padding:20px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <span style="font-weight:700">Lettres arabes</span>
            <span style="color:var(--green);font-weight:700">{{ stats.learnedLetters }}/28</span>
          </div>
          <div class="progress-wrap">
            <div class="progress-bar" [style.width.%]="(stats.learnedLetters / 28) * 100"></div>
          </div>
          <div style="font-size:0.78rem;color:var(--muted);margin-top:8px">
            {{ 28 - stats.learnedLetters }} lettres restantes
          </div>
        </div>

        <!-- Achievements -->
        <p class="section-title">🏆 Accomplissements</p>
        <div class="achievements-grid">
          <div *ngFor="let a of achievements()" class="achievement-card" [class.unlocked]="a.unlocked">
            <div class="ach-icon">{{ a.unlocked ? a.icon : '🔒' }}</div>
            <div class="ach-name">{{ a.name }}</div>
            <div class="ach-desc">{{ a.desc }}</div>
          </div>
        </div>

      </ng-container>

      <div *ngIf="!loading && !stats" class="empty-state">
        <p style="text-align:center;color:var(--muted);padding:40px 0">
          Commencez une session dhikr pour voir vos statistiques !
        </p>
      </div>
    </div>
  `,
  styles: [`
    .metrics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px; }
    .metric-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 20px 16px;
      text-align: center;
    }
    .metric-num { font-size: 2.2rem; font-weight: 800; color: var(--green); line-height: 1; }
    .metric-label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 6px; }

    .streak-card {
      background: linear-gradient(135deg, var(--gold-light) 0%, #fff8ec 100%);
      border: 1.5px solid var(--gold);
      border-radius: var(--radius-md);
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 8px;
    }
    .streak-flame { font-size: 2rem; }
    .streak-body { flex: 1; }
    .streak-title { font-weight: 700; font-size: 1rem; }
    .streak-sub { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }
    .streak-count { text-align: center; }
    .streak-num { font-size: 2.4rem; font-weight: 800; color: var(--gold-dark); display: block; line-height: 1; }
    .streak-unit { font-size: 0.75rem; color: var(--gold-dark); font-weight: 600; }

    .chart-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 20px;
      margin-bottom: 8px;
    }
    .bar-chart { display: flex; align-items: flex-end; gap: 8px; height: 120px; }
    .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; justify-content: flex-end; }
    .bar-val { font-size: 0.68rem; font-weight: 700; color: var(--green); min-height: 16px; }
    .bar-wrap { display: flex; flex-direction: column; justify-content: flex-end; width: 100%; }
    .bar {
      background: var(--green);
      border-radius: 4px 4px 0 0;
      width: 100%;
      min-height: 4px;
      transition: height 0.5s ease;
    }
    .bar.bar-today { background: var(--gold); }
    .bar-label { font-size: 0.65rem; color: var(--muted); }

    .achievements-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .achievement-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 16px 12px;
      text-align: center;
      opacity: 0.55;
    }
    .achievement-card.unlocked {
      background: var(--gold-light);
      border-color: var(--gold);
      opacity: 1;
    }
    .ach-icon { font-size: 1.8rem; margin-bottom: 6px; }
    .ach-name { font-weight: 700; font-size: 0.82rem; }
    .ach-desc { font-size: 0.7rem; color: var(--muted); margin-top: 4px; }
  `]
})
export class StatsComponent implements OnInit {
  stats: StatsResponse | null = null;
  loading = true;
  private readonly MAX_BAR = 90;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.statsService.getMyStats().subscribe({
      next: (s) => { this.stats = s; this.loading = false; },
      error: () => this.loading = false
    });
  }

  barHeight(count: number): number {
    if (!this.stats) return 4;
    const max = Math.max(...this.stats.weeklyStats.map(d => d.count), 1);
    return Math.max(4, Math.round((count / max) * this.MAX_BAR));
  }

  achievements() {
    if (!this.stats) return [];
    return [
      { icon: '📿', name: 'Premier Dhikr',      desc: 'Compléter un dhikr',        unlocked: this.stats.completedSessions >= 1 },
      { icon: '⭐', name: '100 Dhikrs',           desc: '100 dhikrs au total',       unlocked: this.stats.totalDhikrs >= 100 },
      { icon: '📖', name: 'Première Leçon',      desc: 'Compléter une leçon',       unlocked: this.stats.completedLessons >= 1 },
      { icon: 'أ',  name: 'Apprenti arabe',       desc: '10 lettres apprises',       unlocked: this.stats.learnedLetters >= 10 },
      { icon: '🌟', name: 'Assidu',               desc: '5 sessions complètes',      unlocked: this.stats.completedSessions >= 5 },
      { icon: '🕌', name: 'Dévot',                desc: 'Toutes les lettres apprises', unlocked: this.stats.learnedLetters >= 28 },
    ];
  }
}
