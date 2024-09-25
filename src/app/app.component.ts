import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DictionaryService } from './dictionary.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  word: string = '';
  wordDetails: any;

  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(
    private router: Router,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const match = this.router.url.match(/^\/en\/(.+)/);
      const searchTerm = match ? match[1] : '';
      if (searchTerm) {
        this.word = searchTerm.replace('%20', ' ');
        this.performSearch(searchTerm);
      }else if (searchTerm == '') {
        this.word = '';
        this.wordDetails = null;
      }
    });
  }

  searchWord(word?: string): void {
    const searchTerm = word || this.word;
    if (searchTerm.trim()) {
      this.router.navigate(['/en', searchTerm]);
    }
  }

  performSearch(word: string): void {
    this.dictionaryService.getWordDetails(word).subscribe(
      (data) => {
        this.wordDetails = data;
      },
      (error) => {
        console.error('Error fetching word details', error);
        this.wordDetails = null;
      }
    );
  }

  hasSynonyms(): boolean {
    if (!this.wordDetails || !this.wordDetails.length) {
      return false;
    }
    for (let detail of this.wordDetails) {
      for (let meaning of detail.meanings) {
        if (meaning.synonyms && meaning.synonyms.length > 0) {
          return true;
        }
      }
    }
    return false;
  }

  getIndex(i: number, j: number): number {
    let counter = 0;
    for (let k = 0; k < i; k++) {
      counter += this.wordDetails[k].meanings.length;
    }
    return counter + j + 1;
  }

  playAudio(): void {
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.play();
    }
  }
}
