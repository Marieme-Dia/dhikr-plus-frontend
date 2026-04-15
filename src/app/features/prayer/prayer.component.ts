import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PrayerTime {
  name: string;
  arabic: string;
  time: string;
  icon: string;
  passed?: boolean;
  current?: boolean;
}

@Component({
  selector: 'app-prayer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-in">

      <!-- Location banner -->
      <div class="location-banner">
        <div class="loc-info">
          <span class="loc-icon">📍</span>
          <div>
            <div class="loc-city">{{ city }}</div>
            <div class="loc-date">{{ today }}</div>
          </div>
        </div>
        <button class="loc-btn" (click)="detectLocation()" [disabled]="locating">
          {{ locating ? '...' : '🔄 Localiser' }}
        </button>
      </div>

      <!-- Next prayer hero -->
      <div class="next-prayer-card" *ngIf="nextPrayer">
        <div class="next-label">Prochaine prière</div>
        <div class="next-arabic arabic">{{ nextPrayer.arabic }}</div>
        <div class="next-name">{{ nextPrayer.name }}</div>
        <div class="next-time">{{ nextPrayer.time }}</div>
        <div class="next-countdown">dans {{ countdown }}</div>
        <div class="next-icon-bg">{{ nextPrayer.icon }}</div>
      </div>

      <!-- All prayers list -->
      <p class="section-title">Horaires du jour</p>
      <div class="prayers-list">
        <div *ngFor="let p of prayers"
             class="prayer-row"
             [class.prayer-passed]="p.passed"
             [class.prayer-current]="p.current">
          <div class="prayer-icon-wrap">{{ p.icon }}</div>
          <div class="prayer-info">
            <div class="prayer-name">{{ p.name }}</div>
            <div class="prayer-arabic arabic">{{ p.arabic }}</div>
          </div>
          <div class="prayer-time">{{ p.time }}</div>
          <div class="prayer-status">
            <span *ngIf="p.current" class="status-badge status-now">EN COURS</span>
            <span *ngIf="p.passed && !p.current" class="status-badge status-passed">✓</span>
          </div>
        </div>
      </div>

      <!-- Sunnah reminders -->
      <p class="section-title">Sunnah & Rappels</p>
      <div class="reminders-grid">
        <div class="reminder-card" *ngFor="let r of reminders">
          <div class="reminder-icon">{{ r.icon }}</div>
          <div class="reminder-title">{{ r.title }}</div>
          <div class="reminder-text">{{ r.text }}</div>
        </div>
      </div>

      <!-- Hijri date -->
      <div class="hijri-card">
        <div class="hijri-label">Date Hégirien</div>
        <div class="hijri-date arabic">{{ hijriDate }}</div>
        <div class="hijri-sub">{{ hijriSub }}</div>
      </div>

      <!-- Adhkar rapide -->
      <p class="section-title">Adhkar après prière</p>
      <div class="adhkar-list">
        <div *ngFor="let a of adhkarList; let i = index" class="adhkar-item">
          <div class="adhkar-num">{{ i+1 }}</div>
          <div class="adhkar-body">
            <div class="adhkar-arabic arabic">{{ a.arabic }}</div>
            <div class="adhkar-fr">{{ a.fr }}</div>
            <div class="adhkar-count">× {{ a.count }}</div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    /* Location banner */
    .location-banner {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      gap: 12px;
    }
    .loc-info { display:flex; align-items:center; gap:10px; }
    .loc-icon { font-size:1.3rem; }
    .loc-city { font-weight:700; font-size:0.95rem; }
    .loc-date { font-size:0.75rem; color:var(--muted); margin-top:1px; }
    .loc-btn {
      background:var(--green-light); border:1.5px solid var(--green);
      color:var(--green-dark); padding:8px 14px; border-radius:8px;
      cursor:pointer; font-size:0.8rem; font-weight:700;
      font-family:'Nunito',sans-serif; transition:all 0.2s; white-space:nowrap;
      flex-shrink:0;
    }
    .loc-btn:hover { background:var(--green); color:#fff; }
    .loc-btn:disabled { opacity:0.6; cursor:not-allowed; }

    /* Next prayer hero */
    .next-prayer-card {
      background: linear-gradient(135deg, var(--green-dark) 0%, #1D9E75 100%);
      border-radius: var(--radius-lg);
      padding: 28px 24px;
      color: #fff;
      text-align: center;
      margin-bottom: 8px;
      position: relative;
      overflow: hidden;
    }
    .next-icon-bg {
      position:absolute; right:16px; top:50%; transform:translateY(-50%);
      font-size:4.5rem; opacity:0.12; pointer-events:none;
    }
    .next-label { font-size:0.78rem; text-transform:uppercase; letter-spacing:0.1em; opacity:0.8; margin-bottom:8px; }
    .next-arabic { font-size:1.6rem; color:rgba(255,255,255,0.9); margin-bottom:4px; }
    .next-name { font-size:1.1rem; font-weight:700; margin-bottom:12px; }
    .next-time { font-size:3.2rem; font-weight:800; line-height:1; color:var(--gold); }
    .next-countdown { font-size:0.85rem; opacity:0.85; margin-top:8px; }

    /* Prayers list */
    .prayers-list { display:flex; flex-direction:column; gap:8px; margin-bottom:8px; }
    .prayer-row {
      background: var(--card);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-md);
      padding: 14px 18px;
      display: flex; align-items: center; gap: 14px;
      transition: all 0.2s;
    }
    .prayer-row.prayer-passed { opacity:0.5; }
    .prayer-row.prayer-current {
      border-color: var(--green);
      background: var(--green-light);
      box-shadow: 0 0 0 3px rgba(29,158,117,0.12);
    }
    .prayer-icon-wrap { font-size:1.4rem; width:36px; text-align:center; flex-shrink:0; }
    .prayer-info { flex:1; }
    .prayer-name { font-weight:700; font-size:0.95rem; }
    .prayer-arabic { font-size:1rem; color:var(--green-dark); margin-top:1px; }
    .prayer-time { font-size:1.2rem; font-weight:800; color:var(--text); flex-shrink:0; }
    .prayer-status { width:60px; text-align:right; flex-shrink:0; }
    .status-badge {
      display:inline-block; padding:3px 8px; border-radius:20px;
      font-size:0.65rem; font-weight:800; letter-spacing:0.04em;
    }
    .status-now { background:var(--green); color:#fff; }
    .status-passed { background:var(--green-light); color:var(--green-dark); }

    /* Reminders */
    .reminders-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:8px; }
    .reminder-card {
      background:var(--card); border:1px solid var(--border);
      border-radius:var(--radius-md); padding:14px 12px; text-align:center;
    }
    .reminder-icon { font-size:1.6rem; margin-bottom:6px; }
    .reminder-title { font-weight:700; font-size:0.82rem; margin-bottom:4px; }
    .reminder-text { font-size:0.72rem; color:var(--muted); line-height:1.4; }

    /* Hijri */
    .hijri-card {
      background: var(--gold-light);
      border: 1.5px solid var(--gold);
      border-radius: var(--radius-md);
      padding: 18px 20px;
      text-align: center;
      margin-bottom: 8px;
    }
    .hijri-label { font-size:0.75rem; color:var(--gold-dark); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px; }
    .hijri-date { font-size:1.5rem; color:var(--green-dark); margin-bottom:4px; }
    .hijri-sub { font-size:0.82rem; color:var(--muted); }

    /* Adhkar */
    .adhkar-list { display:flex; flex-direction:column; gap:10px; }
    .adhkar-item {
      background:var(--card); border:1px solid var(--border);
      border-radius:var(--radius-md); padding:14px 16px;
      display:flex; gap:14px; align-items:flex-start;
    }
    .adhkar-num {
      width:28px; height:28px; border-radius:50%;
      background:var(--green-light); color:var(--green-dark);
      display:flex; align-items:center; justify-content:center;
      font-size:0.8rem; font-weight:800; flex-shrink:0; margin-top:2px;
    }
    .adhkar-body { flex:1; }
    .adhkar-arabic { font-size:1.2rem; color:var(--green-dark); margin-bottom:4px; }
    .adhkar-fr { font-size:0.78rem; color:var(--muted); margin-bottom:6px; line-height:1.5; }
    .adhkar-count {
      display:inline-block; background:var(--green-light);
      color:var(--green-dark); padding:2px 10px;
      border-radius:20px; font-size:0.72rem; font-weight:700;
    }

    @media (max-width:480px) {
      .reminders-grid { grid-template-columns:1fr; }
    }
  `]
})
export class PrayerComponent implements OnInit, OnDestroy {
  city = 'Dakar, Sénégal';
  today = '';
  hijriDate = '١٤ شَوَّال ١٤٤٦';
  hijriSub = '14 Shawwal 1446 H';
  locating = false;
  prayers: PrayerTime[] = [];
  nextPrayer: PrayerTime | null = null;
  countdown = '';
  private timer: any;

  reminders = [
    { icon:'🌅', title:'Fajr', text:'Prier 2 rak\'at sunnah avant Fajr' },
    { icon:'☀️', title:'Doha', text:'2 à 8 rak\'at entre lever du soleil et midi' },
    { icon:'🌙', title:'Witr', text:'Terminer la nuit par le Witr (impair)' },
    { icon:'📿', title:'Tasbiha', text:'33×33×34 après chaque prière obligatoire' },
  ];

  adhkarList = [
    { arabic:'أَسْتَغْفِرُ اللهَ', fr:'Je demande pardon à Allah', count: 3 },
    { arabic:'اللَّهُمَّ أَنْتَ السَّلَامُ', fr:'Ô Allah, Tu es As-Salam (la Paix)', count: 1 },
    { arabic:'سُبْحَانَ اللهِ', fr:'Gloire à Allah', count: 33 },
    { arabic:'الحَمْدُ لِلهِ', fr:'Louange à Allah', count: 33 },
    { arabic:'اللهُ أَكْبَرُ', fr:'Allah est le Plus Grand', count: 34 },
    { arabic:'لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ', fr:'Pas de divinité sauf Allah, Seul, sans associé', count: 1 },
  ];

  ngOnInit() {
    this.today = new Date().toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
    this.computePrayers();
    this.startCountdown();
  }

  ngOnDestroy() { if (this.timer) clearInterval(this.timer); }

  computePrayers() {
    // Static prayer times for Dakar (example for today)
    // In production: call an API like aladhan.com/v1/timingsByCity
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const timeToMin = (t: string) => {
      const [hh, mm] = t.split(':').map(Number);
      return hh * 60 + mm;
    };
    const nowMin = h * 60 + m;

    const rawTimes = [
      { name:'Fajr',    arabic:'الفَجْر',   time:'05:32', icon:'🌙' },
      { name:'Chourouk',arabic:'الشُّرُوق',  time:'06:52', icon:'🌅' },
      { name:'Dhuhr',   arabic:'الظُّهْر',   time:'13:10', icon:'☀️' },
      { name:'Asr',     arabic:'العَصْر',    time:'16:28', icon:'🌤️' },
      { name:'Maghrib', arabic:'المَغْرِب',  time:'19:22', icon:'🌇' },
      { name:'Isha',    arabic:'العِشَاء',   time:'20:38', icon:'🌙' },
    ];

    this.prayers = rawTimes.map((p, i) => {
      const pMin = timeToMin(p.time);
      const nextMin = i + 1 < rawTimes.length ? timeToMin(rawTimes[i + 1].time) : 24 * 60;
      return {
        ...p,
        passed: pMin < nowMin,
        current: pMin <= nowMin && nowMin < nextMin
      };
    });

    // Next prayer
    this.nextPrayer = this.prayers.find(p => !p.passed && !p.current) ||
                      this.prayers.find(p => p.current) ||
                      this.prayers[0];
  }

  startCountdown() {
    this.updateCountdown();
    this.timer = setInterval(() => {
      this.updateCountdown();
      this.computePrayers();
    }, 30000);
  }

  updateCountdown() {
    if (!this.nextPrayer) return;
    const now = new Date();
    const [h, m] = this.nextPrayer.time.split(':').map(Number);
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target < now) target.setDate(target.getDate() + 1);
    const diff = Math.round((target.getTime() - now.getTime()) / 60000);
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    this.countdown = hours > 0 ? `${hours}h ${mins}min` : `${mins} min`;
  }

  detectLocation() {
    if (!navigator.geolocation) return;
    this.locating = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // In production: call reverse geocoding API here
        this.city = `${pos.coords.latitude.toFixed(2)}°N, ${pos.coords.longitude.toFixed(2)}°E`;
        this.locating = false;
        this.computePrayers();
      },
      () => {
        this.locating = false;
      }
    );
  }
}
