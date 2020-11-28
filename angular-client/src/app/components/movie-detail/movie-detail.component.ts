import { Component, OnInit } from '@angular/core';
import { MoviedataService } from 'src/app/services/movie/moviedata.service';
import { DatasharingService } from '../../services/data-sharing/datasharing.service';
import {MovieDetail} from '../../models/movie-detail.model';
import {Magnet} from '../../models/magnet.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movieData: MovieDetail;
  movieId: string;
  magnets$: Magnet[];
  movieName: string;
  streamingLink: string;
  constructor(private datasharingService: DatasharingService, private moviedataService: MoviedataService) {
    this.datasharingService.currentId.subscribe(message=>{
      this.movieId=message;
      console.log("MOVIE ID"+ this.movieId)
      this.getMovieDetail(this.movieId);
    })

    this.datasharingService.currentMagnetName.subscribe(message=>{
      this.movieName=message;
      this.getMagnetList(this.movieName);
    })

    this.datasharingService.currentStreamingLink.subscribe(message=>{this.streamingLink=message});
    
   }

  ngOnInit(): void {
  }

  getMagnetList(movieName){
    return this.moviedataService.getMagnetList(movieName).subscribe(data => this.magnets$= data);
  }

  getMovieDetail(movieId){
    return this.moviedataService.getMovieDetail(movieId).subscribe(data => this.movieData = data);
  }

  sendStreamingLinkToPlayer(link){
    this.datasharingService.changeStreamingLink(link);
  }

}
