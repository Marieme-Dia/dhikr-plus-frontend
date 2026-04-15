import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Verse {
  num: number;
  arabic: string;
  french: string;
}

interface SourateData {
  id: number;
  name: string;
  arabic: string;
  revelation: string;
  verseCount: number;
  intro: string;
  verses: Verse[];
}

const SOURATES: SourateData[] = [
  {
    id: 1, name: 'Al-Fatiha', arabic: 'سُورَةُ الفَاتِحَة',
    revelation: 'Mekkoise', verseCount: 7,
    intro: 'La Sourate d\'ouverture — récitée dans chaque rak\'at de la prière',
    verses: [
      { num:1, arabic:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', french:'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux.' },
      { num:2, arabic:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', french:'Louange à Allah, Seigneur de l\'univers.' },
      { num:3, arabic:'الرَّحْمَٰنِ الرَّحِيمِ', french:'Le Tout Miséricordieux, le Très Miséricordieux.' },
      { num:4, arabic:'مَالِكِ يَوْمِ الدِّينِ', french:'Maître du Jour de la rétribution.' },
      { num:5, arabic:'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', french:'C\'est Toi [Seul] que nous adorons, et c\'est Toi [Seul] dont nous implorons le secours.' },
      { num:6, arabic:'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', french:'Guide-nous dans le droit chemin.' },
      { num:7, arabic:'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', french:'Le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés.' },
    ]
  },
  {
    id: 112, name: 'Al-Ikhlas', arabic: 'سُورَةُ الإِخْلَاص',
    revelation: 'Mekkoise', verseCount: 4,
    intro: 'La sourate de la Pureté — équivaut au tiers du Coran',
    verses: [
      { num:1, arabic:'قُلْ هُوَ اللَّهُ أَحَدٌ', french:'Dis : «Il est Allah, Unique».' },
      { num:2, arabic:'اللَّهُ الصَّمَدُ', french:'Allah, le Seul à être imploré pour ce que nous désirons.' },
      { num:3, arabic:'لَمْ يَلِدْ وَلَمْ يُولَدْ', french:'Il n\'a pas engendré, n\'a pas été engendré non plus.' },
      { num:4, arabic:'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', french:'Et il n\'est personne qui Lui soit égal.' },
    ]
  },
  {
    id: 113, name: 'Al-Falaq', arabic: 'سُورَةُ الفَلَق',
    revelation: 'Medinoise', verseCount: 5,
    intro: 'L\'Aube — protection contre le mal',
    verses: [
      { num:1, arabic:'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', french:'Dis : «Je cherche protection auprès du Seigneur de l\'Aube naissante».' },
      { num:2, arabic:'مِن شَرِّ مَا خَلَقَ', french:'contre le mal de ce qu\'Il a créé,' },
      { num:3, arabic:'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', french:'et contre le mal de l\'obscurité quand elle s\'étend,' },
      { num:4, arabic:'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', french:'et contre le mal des diseuses de sorts sur les noeuds,' },
      { num:5, arabic:'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', french:'et contre le mal de l\'envieux quand il envie.' },
    ]
  },
  {
    id: 114, name: 'An-Nas', arabic: 'سُورَةُ النَّاس',
    revelation: 'Medinoise', verseCount: 6,
    intro: 'Les Hommes — protection contre le chuchoteur',
    verses: [
      { num:1, arabic:'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', french:'Dis : «Je cherche protection auprès du Seigneur des hommes».' },
      { num:2, arabic:'مَلِكِ النَّاسِ', french:'du Roi des hommes,' },
      { num:3, arabic:'إِلَٰهِ النَّاسِ', french:'du Dieu des hommes,' },
      { num:4, arabic:'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', french:'contre le mal du mauvais conseiller, le furtif,' },
      { num:5, arabic:'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', french:'qui souffle le mal dans les poitrines des hommes,' },
      { num:6, arabic:'مِنَ الْجِنَّةِ وَالنَّاسِ', french:'qu\'il soit djinn ou homme.' },
    ]
  },
  {
    id: 108, name: 'Al-Kawthar', arabic: 'سُورَةُ الكَوْثَر',
    revelation: 'Mekkoise', verseCount: 3,
    intro: 'L\'Abondance — la plus courte sourate du Coran',
    verses: [
      { num:1, arabic:'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ', french:'Nous t\'avons accordé Al-Kawthar (l\'abondance du bien).' },
      { num:2, arabic:'فَصَلِّ لِرَبِّكَ وَانْحَرْ', french:'Accomplis donc la Salât pour ton Seigneur et sacrifie.' },
      { num:3, arabic:'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ', french:'C\'est bien ton ennemi qui est sans postérité.' },
    ]
  },
  {
    id: 103, name: 'Al-Asr', arabic: 'سُورَةُ العَصْر',
    revelation: 'Mekkoise', verseCount: 3,
    intro: 'Le Temps — résumé du chemin de la réussite',
    verses: [
      { num:1, arabic:'وَالْعَصْرِ', french:'Par le Temps !' },
      { num:2, arabic:'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ', french:'L\'homme est certes en perdition,' },
      { num:3, arabic:'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ', french:'sauf ceux qui ont cru et accompli de bonnes oeuvres et se sont mutuellement enjoint la vérité et mutuellement enjoint l\'endurance.' },
    ]
  },
];

@Component({
  selector: 'app-sourate-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-in" *ngIf="sourate">

      <!-- Header -->
      <div class="sourate-hero">
        <div class="sourate-num">{{ sourate.id }}</div>
        <div class="sourate-header-info">
          <div class="sourate-arabic-title arabic">{{ sourate.arabic }}</div>
          <div class="sourate-name">{{ sourate.name }}</div>
          <div class="sourate-meta">
            <span class="meta-pill">{{ sourate.revelation }}</span>
            <span class="meta-pill">{{ sourate.verseCount }} versets</span>
          </div>
        </div>
      </div>

      <!-- Bismillah (sauf Al-Fatiha qui l'inclut) -->
      <div class="bismillah arabic" *ngIf="sourate.id !== 1 && sourate.id !== 9">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

      <!-- Intro -->
      <div class="sourate-intro">{{ sourate.intro }}</div>

      <!-- Display mode toggle -->
      <div class="display-toggle">
        <button class="toggle-btn" [class.active]="mode==='both'"   (click)="mode='both'">Arabe + FR</button>
        <button class="toggle-btn" [class.active]="mode==='arabic'" (click)="mode='arabic'">Arabe seul</button>
        <button class="toggle-btn" [class.active]="mode==='french'" (click)="mode='french'">Français seul</button>
      </div>

      <!-- Verses -->
      <div class="verses-list">
        <div *ngFor="let v of sourate.verses" class="verse-card">
          <div class="verse-num">{{ v.num }}</div>
          <div class="verse-content">
            <div class="verse-arabic arabic" *ngIf="mode==='both' || mode==='arabic'">
              {{ v.arabic }} ۝{{ v.num }}
            </div>
            <div class="verse-french" *ngIf="mode==='both' || mode==='french'">
              {{ v.french }}
            </div>
          </div>
        </div>
      </div>

      <!-- Full arabic view -->
      <div class="full-arabic-block" *ngIf="mode==='arabic'">
        <p class="section-title">Texte continu</p>
        <div class="full-arabic arabic">
          {{ getFullArabicText() }}
        </div>
      </div>

    </div>
  `,
  styles: [`
    .sourate-hero {
      background: linear-gradient(135deg, var(--green-dark), #1D9E75);
      border-radius: var(--radius-lg);
      padding: 24px 20px;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 16px;
    }
    .sourate-num {
      font-size: 2.5rem; font-weight: 800; color: var(--gold);
      min-width: 52px; text-align: center; flex-shrink: 0;
    }
    .sourate-arabic-title { font-size: 1.6rem; color: rgba(255,255,255,0.95); margin-bottom: 4px; }
    .sourate-name { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; }
    .sourate-meta { display: flex; gap: 8px; flex-wrap: wrap; }
    .meta-pill {
      background: rgba(255,255,255,0.18); border-radius: 20px;
      padding: 3px 12px; font-size: 0.75rem; font-weight: 600;
    }

    .bismillah {
      text-align: center; font-size: 1.6rem;
      color: var(--green-dark); padding: 16px;
      background: var(--green-light); border-radius: var(--radius-md);
      margin-bottom: 12px;
    }

    .sourate-intro {
      font-size: 0.85rem; color: var(--muted);
      background: var(--card); border: 1px solid var(--border);
      border-left: 4px solid var(--gold); padding: 12px 16px;
      border-radius: var(--radius-md); margin-bottom: 16px;
      font-style: italic;
    }

    .display-toggle { display: flex; gap: 8px; margin-bottom: 16px; }
    .toggle-btn {
      padding: 8px 16px; border-radius: 20px;
      border: 1.5px solid var(--border);
      background: var(--card); cursor: pointer;
      font-size: 0.8rem; font-weight: 700;
      font-family: 'Nunito', sans-serif;
      color: var(--text); transition: all 0.2s;
    }
    .toggle-btn.active { background: var(--green); color: #fff; border-color: var(--green); }

    .verses-list { display: flex; flex-direction: column; gap: 12px; }
    .verse-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius-md); padding: 18px 16px;
      display: flex; gap: 14px; align-items: flex-start;
    }
    .verse-num {
      width: 30px; height: 30px; border-radius: 50%;
      background: var(--green-light); color: var(--green-dark);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.82rem; font-weight: 800; flex-shrink: 0;
    }
    .verse-content { flex: 1; }
    .verse-arabic {
      font-size: 1.4rem; color: var(--green-dark);
      line-height: 1.9; text-align: right; direction: rtl;
      margin-bottom: 10px;
    }
    .verse-french {
      font-size: 0.88rem; color: var(--text);
      line-height: 1.7; font-style: italic;
      border-top: 1px solid var(--border); padding-top: 10px;
    }

    .full-arabic-block { margin-top: 20px; }
    .full-arabic {
      font-size: 1.6rem; line-height: 2.4;
      color: var(--green-dark); text-align: right;
      direction: rtl; padding: 24px;
      background: var(--green-light); border-radius: var(--radius-lg);
    }
  `]
})
export class SourateDetailComponent implements OnInit {
  sourate: SourateData | null = null;
  mode: 'both' | 'arabic' | 'french' = 'both';

  setSourate(id: number) {
    this.sourate = SOURATES.find(s => s.id === id) || SOURATES[0];
  }

  ngOnInit() {
    this.sourate = SOURATES[0];
  }

  getFullArabicText(): string {
  return this.sourate?.verses.map(v => v.arabic).join(' ') || '';
}
}

export { SOURATES };
