import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  videoPath: string;
  videoURL: string;


  // droppedItems = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer le chemin de la vidéo à partir des paramètres de la route
    this.route.paramMap.subscribe(params => {
      this.videoPath = params.get('name');
      this.videoURL = `http://localhost:5000/videos/${this.videoPath}`;
    });
  }

  // drop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(this.droppedItems, event.previousIndex, event.currentIndex);
  //   } else {
  //     const newItem = { ...this.items[event.previousIndex] };
  //     this.droppedItems.push(newItem);
  //   }
  // }

  // acheterArticle() {
  //   alert('Article acheté !');
  // }

  // voireAutreArticle() {
  //   alert('Voir un autre article !');
  // }

  // onSubmit(event: Event) {
  //   event.preventDefault();
  //   const message = (event.target as HTMLFormElement).elements.namedItem('message') as HTMLTextAreaElement;
  //   console.log('Message saisi :', message.value);
  //   alert('Message envoyé : ' + message.value);
  // }
  items = [
    'Autocomplete', 'Button', 'Checkbox Group', 'Date Field', 'File Upload',
    'Header', 'Hidden Input', 'Number', 'Paragraph', 'Radio Group',
     'Text Area'
  ];


  formElements = [
    'Autocomplete', 'Button', 'Checkbox Group', 'Date Field', 'File Upload',
    'Header', 'Hidden Input', 'Number', 'Paragraph', 'Radio Group',
     'Text Area'
  ];

  droppedItems = [];

  acheterArticle() {
    alert('Article acheté !');
  }

  voireAutreArticle() {
    alert('Voir un autre article !');
  }

  onSubmit(event) {
    event.preventDefault();
    const message = event.target.querySelector('#message').value;
    console.log('Message saisi :', message);
    alert('Message envoyé : ' + message);
  }

  drop(event) {
    console.log('Item dropped:', event);
  }

  onDrop(event) {
    const droppedItem = event.item.element.nativeElement.innerText;
    this.droppedItems.push(droppedItem);
    console.log('Dropped item:', droppedItem);
  }
}