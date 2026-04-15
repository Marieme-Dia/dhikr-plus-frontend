import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dhikr } from '../../core/models/models';
import { DhikrService } from '../../core/services/dhikr.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-dhikr',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-in">
      <h2 class="section-title">Choisir un Dhikr</h2>

      <div *ngIf="loading" class="spinner"></div>

      <div class="dhikr-list" *ngIf="!loading">
        <div *ngFor="let d of dhikrs"
             class="dhikr-item"
             [class.selected]="selected?.id === d.id"
             (click)="select(d)">
          <div class="dhikr-info">
            <div class="dhikr-name">{{ d.name }}</div>
            <div class="dhikr-meaning">{{ d.meaning }}</div>
            <div class="dhikr-ref">Objectif : {{ d.defaultTarget }} fois</div>
          </div>
          <div class="dhikr-arabic arabic">{{ d.arabicText }}</div>
        </div>
      </div>

      <!-- Counter zone -->
      <div class="counter-zone" *ngIf="selected" [class.completed]="isCompleted">
        <div class="counter-header">
          <div class="counter-arabic arabic">{{ selected.arabicText }}</div>
          <div class="counter-translit">{{ selected.transliteration }}</div>
          <div class="counter-meaning">{{ selected.meaning }}</div>
        </div>

        <div class="counter-display" [class.pulse]="justIncremented">{{ count }}</div>
        <div class="counter-target-txt">Objectif : {{ selected.defaultTarget }}</div>

        <div class="progress-wrap" style="margin: 16px 0;">
          <div class="progress-bar" [style.width.%]="progressPct"></div>
        </div>

        <button class="btn-counter" (click)="increment()" [disabled]="isCompleted">
          {{ isCompleted ? '✅ Terminé !' : 'Appuyer' }}
        </button>

        <div class="counter-actions">
          <button class="btn btn-secondary" (click)="resetCounter()">🔄 Réinitialiser</button>
          <button class="btn btn-primary" (click)="saveSession()" *ngIf="count > 0">
            💾 Sauvegarder
          </button>
        </div>

        <div class="completed-banner animate-pop" *ngIf="isCompleted">
          ✨ MashaAllah ! Objectif atteint !
        </div>
      </div>

      <div class="empty-state" *ngIf="!selected && !loading">
        <div style="font-size:3rem;text-align:center">📿</div>
        <p style="text-align:center;color:var(--muted);margin-top:12px">Sélectionnez un dhikr pour commencer</p>
      </div>
    </div>
  `,
  styles: [`
    .dhikr-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
    .dhikr-item {
      background: var(--card);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .dhikr-item:hover { border-color: var(--green); background: var(--green-light); }
    .dhikr-item.selected {
      border-color: var(--green);
      background: var(--green-light);
      box-shadow: 0 0 0 3px rgba(29,158,117,0.15);
    }
    .dhikr-info { flex: 1; }
    .dhikr-name { font-weight: 700; font-size: 0.95rem; }
    .dhikr-meaning { font-size: 0.78rem; color: var(--muted); margin-top: 2px; }
    .dhikr-ref { font-size: 0.72rem; color: var(--green); margin-top: 4px; font-weight: 600; }
    .dhikr-arabic { font-size: 1.5rem; color: var(--green-dark); flex-shrink: 0; }

    .counter-zone {
      background: var(--card);
      border: 2px solid var(--green);
      border-radius: var(--radius-lg);
      padding: 28px 24px;
      text-align: center;
      transition: all 0.3s;
    }
    .counter-zone.completed { border-color: var(--gold); background: var(--gold-light); }
    .counter-header { margin-bottom: 20px; }
    .counter-arabic { font-size: 2rem; color: var(--green-dark); margin-bottom: 6px; }
    .counter-translit { font-size: 0.88rem; color: var(--muted); }
    .counter-meaning { font-size: 0.82rem; color: var(--text); margin-top: 4px; }

    .counter-display {
      font-size: 6rem;
      font-weight: 800;
      color: var(--green);
      line-height: 1;
      margin: 16px 0 8px;
      transition: transform 0.1s;
    }
    .counter-display.pulse { animation: pulse 0.15s ease; }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }

    .counter-target-txt { font-size: 0.85rem; color: var(--muted); }

    .btn-counter {
      width: 100%;
      padding: 20px;
      border-radius: var(--radius-md);
      border: none;
      background: var(--green);
      color: #fff;
      font-size: 1.2rem;
      font-weight: 800;
      font-family: 'Nunito', sans-serif;
      cursor: pointer;
      margin: 16px 0 12px;
      transition: all 0.15s;
      letter-spacing: 0.03em;
    }
    .btn-counter:hover:not(:disabled) { background: var(--green-dark); transform: scale(1.01); }
    .btn-counter:active:not(:disabled) { transform: scale(0.98); }
    .btn-counter:disabled { opacity: 0.6; cursor: not-allowed; background: var(--gold-dark); }

    .counter-actions { display: flex; gap: 10px; justify-content: center; }
    .counter-actions .btn { flex: 1; }

    .completed-banner {
      background: var(--gold-light);
      border: 1.5px solid var(--gold);
      border-radius: var(--radius-md);
      padding: 14px;
      font-weight: 700;
      color: var(--gold-dark);
      font-size: 1rem;
      margin-top: 16px;
    }
  `]
})
export class DhikrComponent implements OnInit {
  dhikrs: Dhikr[] = [];
  selected: Dhikr | null = null;
  count = 0;
  loading = true;
  justIncremented = false;

  constructor(private dhikrService: DhikrService, private toast: ToastService) {}

  ngOnInit() {
    this.dhikrService.getAllDhikrs().subscribe({
      next: (d) => { this.dhikrs = d; this.loading = false; },
      error: () => this.loading = false
    });
  }

  get progressPct(): number {
    if (!this.selected) return 0;
    return Math.min(100, Math.round((this.count / this.selected.defaultTarget) * 100));
  }

  get isCompleted(): boolean {
    return !!this.selected && this.count >= this.selected.defaultTarget;
  }

  select(d: Dhikr) {
    this.selected = d;
    this.count = 0;
    setTimeout(() => {
      document.querySelector('.counter-zone')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  increment() {
    if (this.isCompleted) return;
    this.count++;
    this.justIncremented = true;
    setTimeout(() => this.justIncremented = false, 150);
    if (this.isCompleted) {
      this.toast.show('MashaAllah ! Objectif atteint ! ✅');
    }
  }

  resetCounter() {
    this.count = 0;
  }

  saveSession() {
    if (!this.selected) return;
    this.dhikrService.saveSession({
      dhikrId: this.selected.id,
      count: this.count,
      target: this.selected.defaultTarget,
      completed: this.isCompleted
    }).subscribe({
      next: () => this.toast.show('Session sauvegardée ! 💾'),
      error: () => this.toast.show('Erreur lors de la sauvegarde', 'error')
    });
  }
}
