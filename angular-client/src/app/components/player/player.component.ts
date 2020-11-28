import { Component, OnInit } from '@angular/core';
import {DatasharingService} from '../../services/data-sharing/datasharing.service';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  streamingLink: string;
  constructor(private datasharingService: DatasharingService) { 
    this.datasharingService.currentStreamingLink.subscribe(message=>{
      this.streamingLink = "http://localhost:3000/video/"+message;
    })
    this.returnStreamingLink(this.streamingLink);
  }

  ngOnInit(): void {
  }

  returnStreamingLink(link){
    console.log("THIS IS TTHE STREAMING LINK: "+this.streamingLink);
    return this.streamingLink;
  }

}
