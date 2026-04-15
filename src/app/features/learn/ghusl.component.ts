import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ghusl',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-in">

      <!-- Hero -->
      <div class="ghusl-hero">
        <div class="ghusl-hero-icon">💧</div>
        <div>
          <div class="ghusl-arabic arabic">الغُسْل</div>
          <div class="ghusl-title">Le Grand Bain (Ghusl)</div>
          <div class="ghusl-sub">Les grandes ablutions — purification complète du corps</div>
        </div>
      </div>

      <!-- Quand est-il obligatoire ? -->
      <p class="section-title">Quand le Ghusl est-il obligatoire ?</p>
      <div class="causes-grid">
        <div *ngFor="let c of causes" class="cause-card">
          <span class="cause-icon">{{ c.icon }}</span>
          <span class="cause-text">{{ c.text }}</span>
        </div>
      </div>

      <!-- Rukn : éléments obligatoires -->
      <p class="section-title">Éléments obligatoires (Fard)</p>
      <div class="fard-list">
        <div *ngFor="let f of fards; let i=index" class="fard-item">
          <div class="fard-num">{{ i+1 }}</div>
          <div class="fard-body">
            <div class="fard-title">{{ f.title }}</div>
            <div class="fard-arabic arabic">{{ f.arabic }}</div>
            <div class="fard-desc">{{ f.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Étapes complètes (manière du Prophète) -->
      <p class="section-title">Étapes selon la Sunna du Prophète ﷺ</p>
      <div class="steps-list">
        <div *ngFor="let s of steps; let i=index"
             class="step-card"
             [class.step-done]="checkedSteps[i]"
             (click)="toggleStep(i)">
          <div class="step-check" [class.checked]="checkedSteps[i]">
            {{ checkedSteps[i] ? '✓' : (i+1) }}
          </div>
          <div class="step-body">
            <div class="step-title">{{ s.title }}</div>
            <div class="step-arabic arabic" *ngIf="s.arabic">{{ s.arabic }}</div>
            <div class="step-desc">{{ s.desc }}</div>
            <div class="step-note" *ngIf="s.note">💡 {{ s.note }}</div>
          </div>
        </div>
      </div>

      <!-- Reset -->
      <button class="btn btn-secondary" style="width:100%;margin-top:4px" (click)="resetSteps()">
        🔄 Recommencer le guide
      </button>

      <!-- Niyyah -->
      <p class="section-title">L'Intention (Niyyah)</p>
      <div class="niyyah-card">
        <div class="niyyah-arabic arabic">نَوَيْتُ الغُسْلَ لِرَفْعِ الحَدَثِ الأَكْبَرِ</div>
        <div class="niyyah-fr">"J'ai l'intention de faire le grand bain pour lever l'impureté majeure"</div>
        <div class="niyyah-note">L'intention est dans le cœur, elle n'est pas prononcée à voix haute.</div>
      </div>

      <!-- Ce qui est interdit sans Ghusl -->
      <p class="section-title">Ce qui est interdit sans Ghusl</p>
      <div class="forbidden-list">
        <div *ngFor="let f of forbidden" class="forbidden-item">
          <span class="forbidden-x">✗</span>
          <span>{{ f }}</span>
        </div>
      </div>

      <!-- Ce qui est permis -->
      <p class="section-title">Ce qui reste permis</p>
      <div class="allowed-list">
        <div *ngFor="let a of allowed" class="allowed-item">
          <span class="allowed-check">✓</span>
          <span>{{ a }}</span>
        </div>
      </div>

      <!-- Hadith -->
      <div class="hadith-card" style="margin-top:16px">
        <div class="hadith-arabic arabic">الطَّهُورُ شَطْرُ الإِيمَانِ</div>
        <div class="hadith-fr">"La purification est la moitié de la foi."</div>
        <div class="hadith-source">— Sahih Muslim</div>
      </div>

    </div>
  `,
  styles: [`
    /* Hero */
    .ghusl-hero {
      background: linear-gradient(135deg, #185FA5 0%, #378ADD 100%);
      border-radius: var(--radius-lg);
      padding: 24px 20px;
      color: #fff;
      display: flex; align-items: center; gap: 20px;
      margin-bottom: 16px;
    }
    .ghusl-hero-icon { font-size: 3rem; flex-shrink:0; }
    .ghusl-arabic { font-size: 1.8rem; color: rgba(255,255,255,0.95); margin-bottom:4px; }
    .ghusl-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 4px; }
    .ghusl-sub { font-size: 0.8rem; opacity: 0.85; }

    /* Causes */
    .causes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom:8px; }
    .cause-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius-md); padding: 12px 14px;
      display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 600;
    }
    .cause-icon { font-size: 1.3rem; flex-shrink:0; }

    /* Fard */
    .fard-list { display:flex; flex-direction:column; gap:10px; margin-bottom:8px; }
    .fard-item {
      background: #E6F1FB; border: 1px solid #B5D4F4;
      border-radius: var(--radius-md); padding: 14px 16px;
      display: flex; gap: 14px; align-items: flex-start;
    }
    .fard-num {
      width:28px; height:28px; border-radius:50%;
      background:#185FA5; color:#fff;
      display:flex; align-items:center; justify-content:center;
      font-size:0.82rem; font-weight:800; flex-shrink:0;
    }
    .fard-title { font-weight:700; font-size:0.92rem; color:#042C53; margin-bottom:3px; }
    .fard-arabic { font-size:1.1rem; color:#0C447C; margin-bottom:4px; }
    .fard-desc { font-size:0.78rem; color:#185FA5; line-height:1.5; }

    /* Steps */
    .steps-list { display:flex; flex-direction:column; gap:10px; margin-bottom:12px; }
    .step-card {
      background: var(--card); border: 1.5px solid var(--border);
      border-radius: var(--radius-md); padding: 16px 16px;
      display: flex; gap: 14px; align-items: flex-start;
      cursor: pointer; transition: all 0.2s;
    }
    .step-card:hover { border-color: var(--green); }
    .step-card.step-done { background: var(--green-light); border-color: var(--green); opacity:0.85; }
    .step-check {
      width:32px; height:32px; border-radius:50%;
      background: var(--border); color: var(--muted);
      display:flex; align-items:center; justify-content:center;
      font-size:0.85rem; font-weight:800; flex-shrink:0;
      transition: all 0.2s;
    }
    .step-check.checked { background:var(--green); color:#fff; }
    .step-title { font-weight:700; font-size:0.92rem; margin-bottom:4px; }
    .step-arabic { font-size:1.1rem; color:var(--green-dark); margin-bottom:6px; }
    .step-desc { font-size:0.8rem; color:var(--text); line-height:1.6; }
    .step-note {
      font-size:0.75rem; color:var(--gold-dark);
      background:var(--gold-light); border-radius:6px;
      padding:6px 10px; margin-top:8px; line-height:1.5;
    }

    /* Niyyah */
    .niyyah-card {
      background: var(--green-light); border: 1.5px solid var(--green);
      border-radius: var(--radius-md); padding: 20px; text-align:center;
    }
    .niyyah-arabic { font-size:1.3rem; color:var(--green-dark); margin-bottom:10px; }
    .niyyah-fr { font-size:0.88rem; font-style:italic; color:var(--text); margin-bottom:8px; line-height:1.6; }
    .niyyah-note { font-size:0.75rem; color:var(--muted); }

    /* Forbidden / Allowed */
    .forbidden-list, .allowed-list { display:flex; flex-direction:column; gap:8px; margin-bottom:8px; }
    .forbidden-item, .allowed-item {
      background:var(--card); border:1px solid var(--border);
      border-radius:var(--radius-md); padding:10px 14px;
      display:flex; align-items:center; gap:12px; font-size:0.85rem;
    }
    .forbidden-x {
      color:#E24B4A; font-size:1rem; font-weight:800; flex-shrink:0; width:20px; text-align:center;
    }
    .allowed-check {
      color:var(--green); font-size:1rem; font-weight:800; flex-shrink:0; width:20px; text-align:center;
    }

    /* Hadith */
    .hadith-card {
      background:var(--card); border:1px solid var(--border);
      border-left:4px solid var(--green); border-radius:var(--radius-md); padding:20px;
    }
    .hadith-arabic { font-size:1.3rem; color:var(--green-dark); margin-bottom:10px; }
    .hadith-fr { font-size:0.88rem; font-style:italic; color:var(--text); margin-bottom:6px; line-height:1.6; }
    .hadith-source { font-size:0.75rem; color:var(--muted); }

    @media(max-width:480px) {
      .causes-grid { grid-template-columns:1fr; }
    }
  `]
})
export class GhuslComponent {
  checkedSteps: boolean[] = [];

  causes = [
    { icon:'🌙', text:'Rapport conjugal (même sans éjaculation)' },
    { icon:'💧', text:'Éjaculation avec plaisir (homme ou femme)' },
    { icon:'🌸', text:'Fin des menstruations (hayd)' },
    { icon:'🩸', text:'Fin des lochies post-partum (nifas)' },
    { icon:'☁️', text:'Ihtilam (pollution nocturne) avec trace' },
    { icon:'🕊️', text:'Mort d\'un musulman (ghusl du défunt)' },
  ];

  fards = [
    {
      title: 'L\'intention (Niyyah)',
      arabic: 'النِّيَّة',
      desc: 'Avoir l\'intention dans le cœur de lever l\'impureté majeure. Elle n\'est pas prononcée à voix haute.'
    },
    {
      title: 'Rinçage complet de la bouche (Madhmadhah)',
      arabic: 'المَضْمَضَة',
      desc: 'Faire circuler l\'eau dans toute la bouche.'
    },
    {
      title: 'Rinçage du nez (Istinshaq)',
      arabic: 'الاسْتِنْشَاق',
      desc: 'Aspirer l\'eau dans les narines puis la faire ressortir.'
    },
    {
      title: 'Laver tout le corps',
      arabic: 'تَعْمِيم البَدَن بِالمَاء',
      desc: 'Faire couler l\'eau sur tout le corps sans exception — cheveux, racines, oreilles, nombril, creux des doigts, orteils.'
    },
  ];

  steps = [
    {
      title: '1. Intention dans le cœur',
      arabic: 'نَوَيْتُ الغُسْلَ',
      desc: 'Former l\'intention de lever l\'impureté majeure. Pas besoin de la prononcer à voix haute.',
      note: 'L\'intention doit précéder le début du ghusl.'
    },
    {
      title: '2. Dire Bismillah',
      arabic: 'بِسْمِ اللهِ',
      desc: 'Commencer par le nom d\'Allah avant de verser l\'eau.',
      note: null
    },
    {
      title: '3. Se laver les deux mains (3 fois)',
      arabic: null,
      desc: 'Laver les mains jusqu\'aux poignets trois fois avant de commencer, comme dans le wudu.',
      note: null
    },
    {
      title: '4. Laver les parties intimes',
      arabic: 'غَسْل الفَرْج',
      desc: 'Nettoyer soigneusement les parties privées à la main gauche, puis se laver la main gauche.',
      note: null
    },
    {
      title: '5. Faire le Wudu complet',
      arabic: 'الوُضُوء',
      desc: 'Accomplir les ablutions mineures complètes : visage, bras, tête, pieds — sauf les pieds que l\'on peut reporter à la fin.',
      note: 'Le Prophète ﷺ faisait le wudu complet avant de verser l\'eau sur le corps.'
    },
    {
      title: '6. Verser 3 fois sur la tête',
      arabic: 'إِفَاضَة المَاء عَلَى الرَّأْس',
      desc: 'Verser de l\'eau sur la tête trois fois en faisant pénétrer l\'eau jusqu\'aux racines des cheveux.',
      note: 'Pour les femmes aux longs cheveux : pas besoin de dénouer, il suffit de mouiller les racines.'
    },
    {
      title: '7. Rincer la tête et passer les doigts',
      arabic: null,
      desc: 'Passer les doigts dans les cheveux pour que l\'eau atteigne bien toutes les racines.',
      note: null
    },
    {
      title: '8. Laver le côté droit du corps',
      arabic: null,
      desc: 'Verser l\'eau sur tout le côté droit du corps : épaule, bras, flanc, jambe, pied.',
      note: 'Commencer par le côté droit est sunnah.'
    },
    {
      title: '9. Laver le côté gauche du corps',
      arabic: null,
      desc: 'Verser l\'eau sur tout le côté gauche du corps de la même façon.',
      note: null
    },
    {
      title: '10. S\'assurer qu\'aucun endroit n\'est sec',
      arabic: null,
      desc: 'Vérifier les creux : oreilles, nombril, aisselles, creux des doigts et des orteils, dessous des bras.',
      note: 'Toute zone sèche invalide le ghusl.'
    },
    {
      title: '11. Laver les pieds (si reportés)',
      arabic: null,
      desc: 'Terminer par les pieds si on ne les a pas lavés pendant le wudu.',
      note: null
    },
  ];

  forbidden = [
    'Accomplir la prière (Salat)',
    'Toucher le Mushaf (Coran) ou le réciter',
    'Rester dans la mosquée',
    'Faire le Tawaf autour de la Kaaba',
    'Jeûner (le jeûne reste valide mais il faut faire le ghusl avant Fajr)',
  ];

  allowed = [
    'Dormir, manger, boire',
    'Parler, travailler',
    'Faire le dhikr et la supplication (dua) de mémoire',
    'Écouter le Coran',
  ];

  constructor() {
    this.checkedSteps = new Array(this.steps.length).fill(false);
  }

  toggleStep(i: number) {
    this.checkedSteps[i] = !this.checkedSteps[i];
  }

  resetSteps() {
    this.checkedSteps = new Array(this.steps.length).fill(false);
  }
}
