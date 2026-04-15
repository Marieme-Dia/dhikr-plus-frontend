import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lesson, UserProgress } from '../models/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LessonService {
  private apiUrl = `${environment.apiUrl}/lessons`;

  constructor(private http: HttpClient) {}

  getAllLessons(type?: string): Observable<Lesson[]> {
    const params = type ? `?type=${type}` : '';
    return this.http.get<Lesson[]>(`${this.apiUrl}${params}`);
  }

  getLessonById(id: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${id}`);
  }

  completeLesson(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/complete`, {}, { responseType: 'text' });
  }

  getMyProgress(): Observable<UserProgress[]> {
    return this.http.get<UserProgress[]>(`${this.apiUrl}/my-progress`);
  }
}
