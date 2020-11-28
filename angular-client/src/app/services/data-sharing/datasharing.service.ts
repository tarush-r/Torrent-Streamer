import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class DatasharingService {

  private messageSource = new BehaviorSubject<string>(null);
  currentMessage = this.messageSource.asObservable();

  private movieIdSource = new BehaviorSubject<string>("creed");
  currentId = this.movieIdSource.asObservable();

  private magnetLinkSource = new BehaviorSubject<string>(null);
  currentMagnetName = this.magnetLinkSource.asObservable(); 

  private streamingLinkSource = new BehaviorSubject<string>(null);
  currentStreamingLink = this.streamingLinkSource.asObservable(); 

  constructor() { }

  changeId(message: string){
    this.movieIdSource.next(message)
  }

  changeMessage(message: string){
    this.messageSource.next(message)
  }

  changeMagnet(message: string){
    this.magnetLinkSource.next(message)
  }

  changeStreamingLink(message: string){
    this.streamingLinkSource.next(message)
  }

}
