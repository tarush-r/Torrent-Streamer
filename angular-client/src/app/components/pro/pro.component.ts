import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MoviedataService } from 'src/app/services/movie/moviedata.service';
import {Magnet} from '../../models/magnet.model';
import { DatasharingService } from '../../services/data-sharing/datasharing.service';
@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent implements OnInit {
  magnets$: Magnet[];
  username="";
  constructor(private datasharingService: DatasharingService, private router: Router, private moviedataService: MoviedataService, private authService: AuthService) {
    this.authService.getUsername().subscribe(
      data=>{
        this.username = data.toString()
        if (this.username == "[object Object]") {
          this.router.navigate(['/login'])
        }
      },
      error=>this.router.navigate(['/login'])
    )
  }

  ngOnInit(): void {
  }

  getProMovieList(movieName){
    console.log("Movie name"+movieName.value);
    return this.moviedataService.getMagnetList(movieName.value).subscribe(data => this.magnets$= data);
  }
  
  sendStreamingLinkToPlayer(link){
    this.datasharingService.changeStreamingLink(link);
  }
}
