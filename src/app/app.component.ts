import { Component } from '@angular/core';
import { DictionaryService } from './dictionary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  word: string = '';
  wordDetails: any;

  constructor(private dictionaryService: DictionaryService) { }

  searchWord() {
    if (this.word.trim()) {
      this.dictionaryService.getWordDetails(this.word).subscribe(
        (data) => {
          this.wordDetails = data;
        },
        (error) => {
          console.error('Error fetching word details', error);
          this.wordDetails = null;
        }
      );
    }
  }
}
