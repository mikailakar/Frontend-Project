import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  private apiUrl = environment.apiUrls.wordsApiUrl;

  constructor(private http: HttpClient) { }

  getWordDetails(word: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${word}`);
  }
}
