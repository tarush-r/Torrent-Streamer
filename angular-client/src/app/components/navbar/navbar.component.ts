import { Component, OnInit } from '@angular/core';
import { MoviedataService } from '../../services/movie/moviedata.service';
import { Movie } from '../../models/movie.model'
import { DatasharingService } from '../../services/data-sharing/datasharing.service';
import { CardsComponent } from '../cards/cards.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = '';
  message: string;
  movies$: Movie[];
  cards: CardsComponent;
  constructor(private moviedataService: MoviedataService, private datasharingService: DatasharingService, private authService: AuthService, private router: Router) {
    this.authService.getUsername().subscribe(
      data => {
        this.username = data.toString();
        if (this.username == "[object Object]") {
          localStorage.removeItem('token');
        }
        // window.location.reload();
        // console.log("SUERNAME: " + this.username)
      },
      error => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    )
  }

  ngOnInit(): void {
    this.datasharingService.currentMessage.subscribe(message => this.message = message);
    console.log("USERNAME IS " + this.username)
  }

  sendMovieNameToCards(movieSearch) {
    // this.cards.searchMovie(movieSearch)
    this.router.navigate(['/']);
    // console.log("Search value here"+movieSearch);
   
    this.datasharingService.changeMessage(movieSearch);
    
  }

  searchMovie(movieSearch) {
    this.moviedataService.getMovieList(movieSearch.value).subscribe(data => this.movies$ = data);
    // this.datasharingService.changeMessage(this.message)
  }

  // checkLogin() {
  //   this.authService.getUsername().subscribe(
  //     data => {
  //       this.username = data.toString();
  //       if (this.username == "[object Object]") {
  //         localStorage.removeItem('token');
  //         return false;
  //       }
  //       return true;
  //       // window.location.reload();
  //       console.log("SUERNAME: " + this.username)
  //     },
  //     error => {
  //       localStorage.removeItem('token');
  //       this.router.navigate(['/']);
  //     }
  //   )
  // }

}
