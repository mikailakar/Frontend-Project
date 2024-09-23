import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    //private route: ActivatedRoute,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit(): void {
    //console.log(this.location.path());//Ang
    //console.log(window.location.href, this.router);//JS
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const match = this.router.url.match(/^\/en\/(.+)/);
      const searchTerm = match ? match[1] : "";
      if (searchTerm) {
        this.word = searchTerm;
        this.performSearch(this.word);
      }else if (searchTerm == "") {
        this.word = '';
        this.wordDetails = null;
      }
    });
  }

  searchWord(word?: string): void {
    const searchTerm = word || this.word;
    if (searchTerm.trim()) {
      this.router.navigate(['/en', searchTerm])/*.then(() => {
        this.word = searchTerm;
        this.performSearch(searchTerm);
      })*/;
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
}
