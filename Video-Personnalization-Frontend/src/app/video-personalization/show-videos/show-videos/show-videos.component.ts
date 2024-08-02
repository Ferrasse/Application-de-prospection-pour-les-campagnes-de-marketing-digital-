/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-videos',
  templateUrl: './show-videos.component.html',
  styleUrls: ['./show-videos.component.css']
})
export class ShowVideosComponent implements OnInit {
  videoName: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.videoName = params['name'];
    });
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-videos',
  templateUrl: './show-videos.component.html',
  styleUrls: ['./show-videos.component.css']
})
export class ShowVideosComponent implements OnInit {
  videoPath: string;
  videoURL: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer le chemin de la vidéo à partir des paramètres de la route
    this.route.paramMap.subscribe(params => {
      this.videoPath = params.get('name');
      this.videoURL = `http://localhost:5000/videos/${this.videoPath}`;
    });
  }
}

