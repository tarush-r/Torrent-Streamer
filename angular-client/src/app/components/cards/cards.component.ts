import { Component, OnInit } from '@angular/core';
import {DatasharingService} from '../../services/data-sharing/datasharing.service';
import { MoviedataService } from '../../services/movie/moviedata.service';
import { Movie } from '../../models/movie.model'
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  message: string;
  movieId: string;
  magnetName: string;
  movies$: Movie[];
  constructor(private moviedataService: MoviedataService, private datasharingService: DatasharingService) {
    this.datasharingService.currentId.subscribe(message=>{this.movieId=message})
    this.datasharingService.currentMagnetName.subscribe(message=>{this.magnetName=message})
    this.datasharingService.currentMessage.subscribe(message=>{
      this.message = message
      this.searchMovie(message)
      console.log("MESSAGE HEHRE: "+message)
    })
   }

  ngOnInit(): void {
    // this.datasharingService.currentMessage.subscribe(message=>{
    //   this.message = message
    //   this.searchMovie(message)
    // })
    console.log("MOVIES: "+this.movies$)
  }

  sendIdToMovieDetail(movieId, movieName){
    this.datasharingService.changeId(movieId)
    this.datasharingService.changeMagnet(movieName)
  }
  

  searchMovie(movieSearch){
    return this.moviedataService.getMovieList(movieSearch).subscribe(data => this.movies$ = data);
  }

}
