import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dhikr, DhikrSession } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DhikrService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllDhikrs(): Observable<Dhikr[]> {
    return this.http.get<Dhikr[]>(`${this.apiUrl}/dhikrs`);
  }

  getDhikrById(id: number): Observable<Dhikr> {
    return this.http.get<Dhikr>(`${this.apiUrl}/dhikrs/${id}`);
  }

  saveSession(session: DhikrSession): Observable<any> {
    return this.http.post(`${this.apiUrl}/sessions`, session);
  }

  getMySessions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sessions`);
  }
}
