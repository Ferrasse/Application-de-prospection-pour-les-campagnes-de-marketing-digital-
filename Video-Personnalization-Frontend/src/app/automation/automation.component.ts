import { Component } from '@angular/core';
import * as Papa from 'papaparse'; 
@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class AutomationComponent {
  videoUrl: string | undefined; 
  csvData: any[][] | undefined; 
 
  onCSVFileSelected(event: any): void { 
  const file = event.target.files[0]; 
 
  if (file) { 
    Papa.parse(file, { 
      complete: (result) => { 
        // Le contenu du CSV est disponible dans result.data 
        console.log('Données CSV:', result.data); 
         
        // Vérifiez la structure des données dans la console 
        this.csvData = result.data; 
 
        if (this.csvData && this.csvData.length > 0) { 
          console.log('En-têtes CSV:', Object.keys(this.csvData[0])); 
        } 
      }, 
      header: true // Si votre CSV a une ligne d'en-tête 
    }); 
  } 
} 
 
 
  onVideoFileSelected(event: any): void { 
    const file = event.target.files[0]; 
 
    if (file) { 
      // Stockez l'URL de la vidéo pour l'affichage 
      this.videoUrl = URL.createObjectURL(file); 
    } 
  } 
}
