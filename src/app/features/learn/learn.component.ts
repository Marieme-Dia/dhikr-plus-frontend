import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson, UserProgress } from '../../core/models/models';
import { LessonService } from '../../core/services/lesson.service';
import { ToastService } from '../../core/services/toast.service';
import { AuthService } from '../../core/services/auth.service';
import { SourateDetailComponent, SOURATES } from './sourate-detail.component';
import { GhuslComponent } from './ghusl.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule, SourateDetailComponent, GhuslComponent],
  template: `
    <div class="page-container animate-in">

      <!-- ══ TABS ══ -->
      <div class="tabs-bar">
        <button *ngFor="let t of tabs"
                class="tab-btn"
                [class.active]="activeTab === t.value"
                (click)="switchTab(t.value)">
          <span class="tab-icon">{{ t.icon }}</span>
          <span>{{ t.label }}</span>
        </button>
      </div>

      <!-- ══════════ ALPHABET ══════════ -->
      <div *ngIf="activeTab === 'alphabet'">
        <div class="alphabet-meta">
          <span class="alpha-progress">{{ learnedIds.length }}/28 lettres apprises</span>
          <div class="progress-wrap" style="flex:1">
            <div class="progress-bar" [style.width.%]="(learnedIds.length/28)*100"></div>
          </div>
        </div>
        <div *ngIf="loadingAlpha" class="spinner"></div>
        <div class="alphabet-grid" *ngIf="!loadingAlpha">
          <div *ngFor="let l of alphabetLessons"
               class="letter-card"
               [class.learned]="isLearned(l.id)"
               (click)="openLetterModal(l)">
            <span class="letter-arabic arabic">{{ l.arabicTitle }}</span>
            <span class="letter-name">{{ l.title }}</span>
            <span class="letter-check" *ngIf="isLearned(l.id)">✓</span>
          </div>
        </div>
      </div>

      <!-- ══════════ SOURATES ══════════ -->
      <div *ngIf="activeTab === 'sourates' && !selectedSourate">
        <div *ngIf="loadingSourates" class="spinner"></div>
        <div class="sourates-intro">
          Cliquez sur une sourate pour lire le texte arabe complet avec la traduction française.
        </div>
        <div class="lesson-list" *ngIf="!loadingSourates">
          <div *ngFor="let s of sourateData"
               class="lesson-card"
               [class.done]="isLessonDone(s.id)"
               (click)="openSourate(s)">
            <div class="lesson-icon-wrap" [style.background]="'var(--green-light)'">📖</div>
            <div class="lesson-body">
              <div class="lesson-arabic arabic">{{ s.arabic }}</div>
              <div class="lesson-title">{{ s.name }}</div>
              <div class="lesson-meta">{{ s.revelation }} · {{ s.verseCount }} versets</div>
            </div>
            <div class="lesson-right">
              <span class="badge" [class.badge-success]="isLessonDone(s.id)" [class.badge-new]="!isLessonDone(s.id)">
                {{ isLessonDone(s.id) ? '✓' : 'Lire' }}
              </span>
              <span class="arrow-icon">→</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ Sourate reader ══ -->
      <div *ngIf="activeTab === 'sourates' && selectedSourate">
        <button class="back-btn" (click)="selectedSourate = null">
          ← Retour aux sourates
        </button>
        <app-sourate-detail #sourateRef></app-sourate-detail>
        <div style="margin-top:16px;display:flex;gap:10px">
          <button class="btn btn-primary" style="flex:1"
                  *ngIf="!isLessonDone(selectedSourate.id)"
                  (click)="markSourateDone(selectedSourate)">
            ✓ Marquer comme lue
          </button>
          <span *ngIf="isLessonDone(selectedSourate.id)"
                style="display:flex;align-items:center;gap:8px;color:var(--green);font-weight:700;font-size:0.9rem">
            ✅ Sourate complétée
          </span>
        </div>
      </div>

      <!-- ══════════ GHUSL ══════════ -->
      <div *ngIf="activeTab === 'ghusl'">
        <app-ghusl></app-ghusl>
      </div>

      <!-- ══════════ VOCABULAIRE ══════════ -->
      <div *ngIf="activeTab === 'vocab'">
        <div class="vocab-list">
          <div *ngFor="let v of vocab" class="vocab-card">
            <div class="vocab-arabic arabic">{{ v.arabic }}</div>
            <div class="vocab-info">
              <div class="vocab-fr">{{ v.fr }}</div>
              <div class="vocab-phonetic">{{ v.phonetic }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ LETTER MODAL ══ -->
      <div class="modal-overlay" *ngIf="modalLetter" (click)="closeModal($event)">
        <div class="modal-box animate-pop">
          <div class="modal-big-letter arabic">{{ modalLetter.arabicTitle }}</div>
          <div class="modal-name">{{ modalLetter.title }}</div>
          <div class="modal-forms">
            <div class="modal-form" *ngFor="let form of modalForms; let i = index">
              <div class="modal-form-arabic arabic">{{ form }}</div>
              <div class="modal-form-label">{{ formLabels[i] }}</div>
            </div>
          </div>
          <div class="modal-btns">
            <button class="btn btn-secondary" (click)="modalLetter = null">Fermer</button>
            <button class="btn btn-primary"
                    [disabled]="isLearned(modalLetter.id)"
                    (click)="markLetterLearned()">
              {{ isLearned(modalLetter.id) ? '✓ Déjà apprise' : '✓ Apprises' }}
            </button>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    /* ── Tabs ── */
    .tabs-bar {
      display: flex; gap: 8px; margin-bottom: 20px;
      overflow-x: auto; scrollbar-width: none; padding-bottom: 2px;
    }
    .tabs-bar::-webkit-scrollbar { display:none; }
    .tab-btn {
      padding: 9px 16px; border-radius: 10px;
      border: 1.5px solid var(--border); background: var(--card);
      cursor: pointer; font-size: 0.82rem; font-weight: 700;
      font-family: 'Nunito', sans-serif; color: var(--text);
      transition: all 0.2s; white-space: nowrap;
      display: flex; align-items: center; gap: 5px; flex-shrink: 0;
    }
    .tab-btn:hover { border-color: var(--green); }
    .tab-btn.active { background: var(--green); color: #fff; border-color: var(--green); }
    .tab-icon { font-size: 1rem; }

    /* ── Alphabet ── */
    .alphabet-meta { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
    .alpha-progress { font-size:0.82rem; color:var(--muted); white-space:nowrap; font-weight:600; }
    .alphabet-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; }
    .letter-card {
      background:var(--card); border:1.5px solid var(--border);
      border-radius:var(--radius-md); padding:14px 8px; text-align:center;
      cursor:pointer; transition:all 0.2s; position:relative;
    }
    .letter-card:hover { border-color:var(--green); transform:translateY(-2px); }
    .letter-card.learned { background:var(--green-light); border-color:var(--green); }
    .letter-arabic { font-size:2rem; display:block; color:var(--green-dark); }
    .letter-name { font-size:0.68rem; color:var(--muted); display:block; margin-top:4px; }
    .letter-check { position:absolute; top:5px; right:7px; font-size:0.68rem; color:var(--green); font-weight:800; }

    /* ── Sourates ── */
    .sourates-intro {
      font-size:0.82rem; color:var(--muted); margin-bottom:14px;
      font-style:italic; padding:10px 14px;
      background:var(--green-light); border-radius:var(--radius-md);
      border-left:3px solid var(--green);
    }
    .lesson-list { display:flex; flex-direction:column; gap:10px; }
    .lesson-card {
      background:var(--card); border:1.5px solid var(--border);
      border-radius:var(--radius-md); padding:14px 16px;
      display:flex; align-items:center; gap:14px;
      cursor:pointer; transition:all 0.2s;
    }
    .lesson-card:hover { border-color:var(--green); transform:translateX(2px); }
    .lesson-card.done { background:var(--green-light); border-color:var(--green); }
    .lesson-icon-wrap {
      width:44px; height:44px; border-radius:10px; background:var(--green-light);
      display:flex; align-items:center; justify-content:center;
      font-size:1.3rem; flex-shrink:0;
    }
    .lesson-body { flex:1; }
    .lesson-arabic { font-size:1.2rem; color:var(--green-dark); }
    .lesson-title { font-weight:700; font-size:0.92rem; margin-top:2px; }
    .lesson-meta { font-size:0.72rem; color:var(--muted); margin-top:2px; }
    .lesson-right { display:flex; flex-direction:column; align-items:flex-end; gap:4px; flex-shrink:0; }
    .arrow-icon { font-size:1rem; color:var(--green); font-weight:700; }

    /* Back button */
    .back-btn {
      background:none; border:1.5px solid var(--border);
      border-radius:10px; padding:8px 16px;
      cursor:pointer; font-size:0.85rem; font-weight:700;
      font-family:'Nunito',sans-serif; color:var(--text);
      margin-bottom:16px; transition:all 0.2s; display:inline-block;
    }
    .back-btn:hover { border-color:var(--green); color:var(--green); }

    /* ── Vocab ── */
    .vocab-list { display:flex; flex-direction:column; gap:10px; }
    .vocab-card {
      background:var(--card); border:1px solid var(--border);
      border-radius:var(--radius-md); padding:14px 18px;
      display:flex; align-items:center; gap:20px;
    }
    .vocab-arabic { font-size:2rem; color:var(--green-dark); width:70px; text-align:center; flex-shrink:0; }
    .vocab-fr { font-weight:700; font-size:0.95rem; }
    .vocab-phonetic { font-size:0.75rem; color:var(--muted); margin-top:3px; font-style:italic; }

    /* ── Letter Modal ── */
    .modal-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,0.55);
      z-index:200; display:flex; align-items:center; justify-content:center; padding:20px;
    }
    .modal-box {
      background:#fff; border-radius:20px; padding:36px 28px;
      max-width:360px; width:100%; text-align:center;
    }
    .modal-big-letter { font-size:5rem; color:var(--green-dark); line-height:1; margin-bottom:10px; }
    .modal-name { font-size:1.3rem; font-weight:700; margin-bottom:4px; }
    .modal-forms { display:flex; justify-content:center; gap:24px; margin:20px 0; }
    .modal-form { text-align:center; }
    .modal-form-arabic { font-size:1.8rem; color:var(--green); }
    .modal-form-label { font-size:0.7rem; color:var(--muted); margin-top:4px; }
    .modal-btns { display:flex; gap:10px; margin-top:20px; }
    .modal-btns .btn { flex:1; padding:12px; }

    @media(max-width:480px) {
      .alphabet-grid { grid-template-columns:repeat(3,1fr); }
    }
  `]
})
export class LearnComponent implements OnInit {
  activeTab = 'alphabet';
  tabs = [
    { label: 'Alphabet', value: 'alphabet', icon: 'أ' },
    { label: 'Sourates', value: 'sourates', icon: '📖' },
    { label: 'Grand Bain', value: 'ghusl', icon: '💧' },
    { label: 'Vocabulaire', value: 'vocab', icon: '🔤' },
  ];

  alphabetLessons: Lesson[] = [];
  learnedIds: number[] = [];
  doneLessonIds: number[] = [];
  loadingAlpha = true;
  loadingSourates = false;
  modalLetter: Lesson | null = null;
  modalForms: string[] = [];
  formLabels = ['Isolée', 'Initiale', 'Finale'];
  selectedSourate: any = null;

  sourateData = SOURATES;

  private readonly forms: Record<string, string[]> = {
    'أ':['أ','أ','ـأ'],'ب':['ب','بـ','ـب'],'ت':['ت','تـ','ـت'],
    'ث':['ث','ثـ','ـث'],'ج':['ج','جـ','ـج'],'ح':['ح','حـ','ـح'],
    'خ':['خ','خـ','ـخ'],'د':['د','د','ـد'],'ذ':['ذ','ذ','ـذ'],
    'ر':['ر','ر','ـر'],'ز':['ز','ز','ـز'],'س':['س','سـ','ـس'],
    'ش':['ش','شـ','ـش'],'ص':['ص','صـ','ـص'],'ض':['ض','ضـ','ـض'],
    'ط':['ط','طـ','ـط'],'ظ':['ظ','ظـ','ـظ'],'ع':['ع','عـ','ـع'],
    'غ':['غ','غـ','ـغ'],'ف':['ف','فـ','ـف'],'ق':['ق','قـ','ـق'],
    'ك':['ك','كـ','ـك'],'ل':['ل','لـ','ـل'],'م':['م','مـ','ـم'],
    'ن':['ن','نـ','ـن'],'و':['و','و','ـو'],'ه':['ه','هـ','ـه'],
    'ي':['ي','يـ','ـي']
  };

  vocab = [
    { arabic:'اللهُ',    fr:'Allah',                phonetic:'Allāhu' },
    { arabic:'رَحْمَن',  fr:'Le Miséricordieux',     phonetic:'Raḥmān' },
    { arabic:'رَحِيم',   fr:'Le Très Miséricordieux',phonetic:'Raḥīm' },
    { arabic:'صَلَاة',   fr:'Prière',                phonetic:'Ṣalāh' },
    { arabic:'صَوْم',    fr:'Jeûne',                 phonetic:'Ṣawm' },
    { arabic:'زَكَاة',   fr:'Aumône légale',         phonetic:'Zakāh' },
    { arabic:'حَجّ',     fr:'Pèlerinage',            phonetic:'Ḥajj' },
    { arabic:'إِيمَان',  fr:'Foi',                   phonetic:'Īmān' },
    { arabic:'إِسْلَام', fr:'Islam',                 phonetic:'Islām' },
    { arabic:'قُرْآن',   fr:'Coran',                 phonetic:'Qurʾān' },
    { arabic:'نَبِي',    fr:'Prophète',              phonetic:'Nabī' },
    { arabic:'مَسْجِد',  fr:'Mosquée',               phonetic:'Masjid' },
    { arabic:'وُضُوء',   fr:'Ablutions mineures',    phonetic:'Wuḍūʾ' },
    { arabic:'غُسْل',    fr:'Grandes ablutions',     phonetic:'Ghusl' },
    { arabic:'تَوْبَة',  fr:'Repentir',              phonetic:'Tawbah' },
    { arabic:'دُعَاء',   fr:'Supplication',          phonetic:'Duʿāʾ' },
  ];

  constructor(
    private lessonService: LessonService,
    private toast: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAlphabet();
    this.loadProgress();
  }

  loadAlphabet() {
    this.loadingAlpha = true;
    this.lessonService.getAllLessons('alphabet').subscribe({
      next: (l) => { this.alphabetLessons = l; this.loadingAlpha = false; },
      error: () => this.loadingAlpha = false
    });
  }

  loadProgress() {
    if (!this.authService.isLoggedIn()) return;
    this.lessonService.getMyProgress().subscribe({
      next: (prog) => {
        this.learnedIds = prog.filter(p => p.completed && p.lesson.lessonType === 'alphabet').map(p => p.lesson.id);
        this.doneLessonIds = prog.filter(p => p.completed).map(p => p.lesson.id);
      },
      error: () => {}
    });
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.selectedSourate = null;
  }

  isLearned(id: number): boolean {
    return this.learnedIds.includes(id);
  }

  isLessonDone(sourateId: number): boolean {
    return this.doneLessonIds.includes(sourateId);
  }

  openLetterModal(l: Lesson) {
    this.modalLetter = l;
    this.modalForms = this.forms[l.arabicTitle] || [l.arabicTitle, l.arabicTitle, l.arabicTitle];
  }

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.modalLetter = null;
    }
  }

  markLetterLearned() {
    if (!this.modalLetter) return;
    this.lessonService.completeLesson(this.modalLetter.id).subscribe({
      next: () => {
        this.learnedIds = [...this.learnedIds, this.modalLetter!.id];
        this.toast.show(`Lettre "${this.modalLetter!.title}" apprise ! ✓`);
        this.modalLetter = null;
      },
      error: () => this.toast.show('Erreur', 'error')
    });
  }

  openSourate(s: any) {
    this.selectedSourate = s;
  }

  markSourateDone(s: any) {
    // Find the lesson by name in DB lessons (best effort)
    this.lessonService.getAllLessons('sourate').subscribe({
      next: (lessons) => {
        const match = lessons.find(l => l.title === s.name);
        if (match) {
          this.lessonService.completeLesson(match.id).subscribe({
            next: () => {
              this.doneLessonIds = [...this.doneLessonIds, s.id];
              this.toast.show(`Sourate ${s.name} complétée ! ✅`);
            },
            error: () => {}
          });
        } else {
          // Mark locally
          this.doneLessonIds = [...this.doneLessonIds, s.id];
          this.toast.show(`Sourate ${s.name} marquée comme lue ✅`);
        }
      },
      error: () => {
        this.doneLessonIds = [...this.doneLessonIds, s.id];
        this.toast.show(`Sourate ${s.name} marquée ✅`);
      }
    });
  }
}
