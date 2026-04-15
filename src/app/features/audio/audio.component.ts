import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Audio } from '../../core/models/models';
import { AudioService } from '../../core/services/audio.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container animate-in">

      <div class="now-playing" *ngIf="playingAudio">
        <div class="wave-anim">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="now-info">
          <div class="now-title">{{ playingAudio.title }}</div>
          <div class="now-sub">{{ playingAudio.reciter }}</div>
        </div>
        <button class="stop-btn" (click)="stopAudio()">⏹ Stop</button>
      </div>

      <div class="filter-bar">
        <button *ngFor="let f of filters"
                class="filter-btn"
                [class.active]="activeFilter === f.value"
                (click)="filterBy(f.value)">
          {{ f.label }}
        </button>
      </div>

      <div *ngIf="loading" class="spinner"></div>

      <div class="audio-list" *ngIf="!loading">
        <div *ngFor="let audio of filteredAudios" class="audio-card">
          <div class="audio-top">
            <div class="audio-thumb">{{ audio.icon }}</div>
            <div class="audio-meta">
              <div class="audio-arabic arabic">{{ audio.arabicTitle }}</div>
              <div class="audio-title-text">{{ audio.title }}</div>
              <div class="audio-sub">{{ audio.reciter }} · {{ audio.duration }}</div>
            </div>
            <button class="play-btn"
                    [class.playing]="playingAudio?.id === audio.id"
                    (click)="toggleAudio(audio)">
              {{ playingAudio?.id === audio.id ? '⏸' : '▶' }}
            </button>
          </div>
          
          <div class="audio-prog-wrap" *ngIf="playingAudio?.id === audio.id">
            <div class="audio-prog-track">
              <div class="audio-prog-fill" [style.width.%]="progress"></div>
            </div>
            <div class="audio-time-row">
              <span>{{ elapsed }}</span>
              <span>{{ audio.duration }}</span>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="filteredAudios.length === 0">
          <p style="text-align:center;color:var(--muted);padding:40px 0">Aucun audio dans cette catégorie</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .now-playing {
      background: var(--green-light);
      border: 1.5px solid var(--green);
      border-radius: var(--radius-md);
      padding: 14px 18px;
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 16px;
    }
    .wave-anim { display: flex; gap: 3px; align-items: flex-end; height: 20px; }
    .wave-anim span {
      width: 3px; background: var(--green); border-radius: 2px;
      animation: wave 0.9s ease-in-out infinite;
    }
    .wave-anim span:nth-child(1) { height: 8px; animation-delay: 0s; }
    .wave-anim span:nth-child(2) { height: 14px; animation-delay: .15s; }
    .wave-anim span:nth-child(3) { height: 10px; animation-delay: .3s; }
    .wave-anim span:nth-child(4) { height: 16px; animation-delay: .45s; }
    .wave-anim span:nth-child(5) { height: 6px; animation-delay: .6s; }
    @keyframes wave { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(.35); } }
    
    .now-info { flex: 1; }
    .now-title { font-weight: 700; font-size: 0.9rem; color: var(--green-dark); }
    .now-sub { font-size: 0.75rem; color: var(--muted); margin-top: 2px; }
    
    .stop-btn {
      background: rgba(0,0,0,0.08); border: none; border-radius: 8px;
      padding: 8px 14px; cursor: pointer; font-size: 0.8rem;
      font-weight: 700; color: var(--green-dark);
    }

    .filter-bar { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
    .filter-btn {
      padding: 8px 18px; border-radius: 20px; border: 1.5px solid var(--border);
      background: var(--card); cursor: pointer; font-size: 0.82rem;
      font-weight: 700; color: var(--text); transition: all 0.2s;
    }
    .filter-btn.active { background: var(--green); color: #fff; border-color: var(--green); }

    .audio-list { display: flex; flex-direction: column; gap: 12px; }
    .audio-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--radius-md); padding: 16px 18px;
    }
    .audio-top { display: flex; align-items: center; gap: 14px; }
    .audio-thumb {
      width: 50px; height: 50px; border-radius: 10px;
      background: var(--green-light); display: flex; align-items: center;
      justify-content: center; font-size: 1.4rem;
    }
    .audio-meta { flex: 1; }
    .audio-arabic { font-size: 1.1rem; color: var(--green-dark); }
    .audio-title-text { font-weight: 700; font-size: 0.9rem; }
    .audio-sub { font-size: 0.75rem; color: var(--muted); }
    
    .play-btn {
      width: 42px; height: 42px; border-radius: 50%;
      background: var(--green); color: #fff; border: none;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
    }
    .play-btn.playing { background: var(--gold-dark); }

    .audio-prog-wrap { margin-top: 12px; }
    .audio-prog-track { background: #eee; border-radius: 4px; height: 4px; }
    .audio-prog-fill { height: 4px; border-radius: 4px; background: var(--green); }
    .audio-time-row { display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--muted); margin-top: 4px; }
  `]
})
export class AudioComponent implements OnInit, OnDestroy {
  audios: Audio[] = [];
  filteredAudios: Audio[] = [];
  playingAudio: Audio | null = null;
  loading = true;
  activeFilter = 'all';
  progress = 0;
  elapsed = '0:00';
  
  // Instance Audio réelle pour jouer le son
  private nativeAudio = new Audio();
  private timer: any;

  filters = [
    { label: 'Tout', value: 'all' },
    { label: '📖 Coran', value: 'coran' },
    { label: '🤲 Invocations', value: 'dua' },
    { label: '📿 Dhikr', value: 'dhikr' }
  ];

  constructor(private audioService: AudioService, private toast: ToastService) {}

  ngOnInit() {
    this.audioService.getAllAudios().subscribe({
      next: (a) => { 
        this.audios = a; 
        this.filteredAudios = a; 
        this.loading = false; 
      },
      error: () => this.loading = false
    });

    // Écouteur pour mettre à jour la barre de progression en temps réel
    this.nativeAudio.ontimeupdate = () => {
      if (this.nativeAudio.duration) {
        this.progress = (this.nativeAudio.currentTime / this.nativeAudio.duration) * 100;
        this.elapsed = this.formatTime(this.nativeAudio.currentTime);
      }
    };

    // Arrêter proprement quand le fichier est fini
    this.nativeAudio.onended = () => this.stopAudio();
  }

  ngOnDestroy() {
    this.stopAudio();
  }

  filterBy(cat: string) {
    this.activeFilter = cat;
    this.filteredAudios = cat === 'all' ? this.audios : this.audios.filter(a => a.category === cat);
  }

  toggleAudio(audio: Audio) {
    // Si on clique sur le même audio, on l'arrête
    if (this.playingAudio?.id === audio.id) {
      this.stopAudio();
      return;
    }

    // Sinon, on arrête l'ancien et on lance le nouveau
    this.stopAudio();
    this.playingAudio = audio;
    
    // On suppose que tes fichiers sont nommés par ID dans assets/audio/
    this.nativeAudio.src = `assets/audio/${audio.id}.mp3`;
    this.nativeAudio.load();
    this.nativeAudio.play().catch(err => {
      this.toast.show("Fichier audio introuvable dans assets/audio/", "error");
      console.error("Erreur de lecture:", err);
    });

    this.toast.show(`▶ Lecture : ${audio.title}`, 'info');
  }

  stopAudio() {
    this.nativeAudio.pause();
    this.nativeAudio.currentTime = 0;
    this.playingAudio = null;
    this.progress = 0;
    this.elapsed = '0:00';
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}