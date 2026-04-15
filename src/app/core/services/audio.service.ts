import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Audio } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AudioService {
  private apiUrl = `${environment.apiUrl}/audios`;

  constructor(private http: HttpClient) {}

  getAllAudios(category?: string): Observable<Audio[]> {
    const params = category && category !== 'all' ? `?category=${category}` : '';
    return this.http.get<Audio[]>(`${this.apiUrl}${params}`);
  }

  getAudioById(id: number): Observable<Audio> {
    return this.http.get<Audio>(`${this.apiUrl}/${id}`);
  }
}
