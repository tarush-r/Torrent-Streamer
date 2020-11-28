import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Movie } from '../../models/movie.model';
import {MovieDetail} from '../../models/movie-detail.model';
import {Magnet} from '../../models/magnet.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MoviedataService {

  finalUrl=""
  apiUrl = 'http://localhost:3000/movieapi/';
  movieDetailUrl = 'http://localhost:3000/moviedetail/';
  magnetUrl='http://localhost:3000/';
  constructor(private _http: HttpClient, private router: Router) { 
    
  }

  getMovieList(movieSearch){
    this.finalUrl = "";
    this.finalUrl = this.apiUrl+movieSearch
    if(movieSearch==null)
    {
      this.router.navigate(['/empty']);
      return;
    }
    console.log(this.finalUrl)
    console.log("PRINTING HERE"+this._http.get<Movie[]>(this.apiUrl))
    return this._http.get<Movie[]>(this.finalUrl);
  }

  getMovieDetail(movieId){
    this.finalUrl = "";
    this.finalUrl = this.movieDetailUrl+movieId;
    return this._http.get<MovieDetail>(this.finalUrl);
  }

  getMagnetList(movieName){
    this.finalUrl="";
    this.finalUrl = this.magnetUrl+movieName;
    return this._http.get<Magnet[]>(this.finalUrl)
  }
}
