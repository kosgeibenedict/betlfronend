import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ContentBlock {
  id: number;
  blockKey: string;
  content: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8081/api/cms';

  getContentByKey(key: string): Observable<string> {
    return this.http.get<ContentBlock>(`${this.apiUrl}/content/${key}`).pipe(
      map(block => block ? block.content : '')
    );
  }

  // Fallback utility for missing content during initial setup
  getContentWithFallback(key: string, fallback: string): Observable<string> {
    return new Observable(observer => {
      this.getContentByKey(key).subscribe({
        next: (content) => {
          observer.next(content || fallback);
          observer.complete();
        },
        error: () => {
          observer.next(fallback);
          observer.complete();
        }
      });
    });
  }
}
