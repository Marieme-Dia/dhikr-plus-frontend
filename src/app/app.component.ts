import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <router-outlet></router-outlet>

    <!-- Global Toast -->
    <div class="toast-container" *ngIf="toast$ | async as toast">
      <div class="toast animate-pop"
           [style.background]="toast.type === 'error' ? '#E24B4A' : toast.type === 'info' ? '#378ADD' : '#085041'">
        {{ toast.message }}
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  toast$;

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }

  ngOnInit() {}
}
