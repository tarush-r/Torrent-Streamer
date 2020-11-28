import { Component, OnInit } from '@angular/core';
import { Movie } from './models/movie.model'
import { MoviedataService } from './services/movie/moviedata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'torrent-streamer';
  movies$: Movie[];
  constructor(private moviedataService: MoviedataService) {

  }

  ngOnInit() {
    // return this.moviedataService.getMovieList("men+in+black").subscribe(data => this.movies$ = data);
  }
}
