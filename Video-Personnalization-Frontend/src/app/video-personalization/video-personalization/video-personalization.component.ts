// video-personalization.component.ts
import { Component, TemplateRef } from '@angular/core';
import { VideoUploadService } from 'src/app/service_videos_processing/video-upload.service';
import { ProcessingService } from 'src/app/service_videos_processing/processing-service.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-video-personalization',
  templateUrl: './video-personalization.component.html',
  styleUrls: ['./video-personalization.component.css'],
 
})
export class VideoPersonalizationComponent {
  csvFileName: string | undefined;
  isLoading = true;
  videoUrl: any; 
  csvData: any[][] | undefined;
  videoId: number | undefined;
  keywords: string[] = []; // Déclaration de la propriété keywords

  dataList: any[] = [];


  passwordVisible = false;
  password?: string;
  Selectedkeyword: string = '';

  form2IsLoding=false;


 
  wordlevel_info: any[] = [];
  
  file_path: any;
  result_text: any;
  addedKeywords: string[] = [];

  tooltipTimeout:any;


  showContent = false;
  showVideo = false;

  showFileName: boolean = true;

  videoFile: File | undefined;
 
  data_url: any;
  videoName: any;
  isVideoNameVisible: boolean = true;
  processingVideo: boolean = false;
  transcriptionData: any; 

  fileToUpload: File = null;
  selectedFileName: string = '';
  videoPath: string;
  message: string;
  finalVideoPath: string;
  personalizedVideosPath: string;
  videoPaths: string[][] = [];
  personalizedVideos: any[] = [];

  
  constructor(private videoUploadService: VideoUploadService, private processingService: ProcessingService,private modalService: NzModalService ,private http: HttpClient ,private router: Router) {}

  onCSVFileSelected(event: any): void { 
    // Code pour gérer le fichier CSV
  }
 
  onVideoFileSelected(event: any): void { 
    const file = event.target.files[0]; 
    if (file) { 
        // Stockez l'URL de la vidéo pour l'affichage 
        this.videoUrl = URL.createObjectURL(file); 

        // Stockez le fichier vidéo sélectionné dans la propriété videoFile
        this.videoFile = file;

        // Envoyer la vidéo au service pour l'upload
        this.videoUploadService.uploadVideo(file).subscribe(
            response => {
                console.log('Vidéo uploadée avec succès:', response);
                // Traitez la réponse si nécessaire
                this.videoId = response.id;
            },
            error => {
                console.error('Erreur lors de l\'upload de la vidéo:', error);
                // Gérez l'erreur
            }
        );
    } 
}


  deleteVideo(id: number): void {
  this.videoUploadService.deleteVideo(id).subscribe(
    (response: any) => {
      console.log('La vidéo a été supprimée avec succès.');
      // Réinitialiser l'ID de la vidéo pour empêcher l'affichage de la vidéo supprimée
      this.videoId = undefined;
    },
    (error: any) => {
      console.error('Erreur lors de la suppression de la vidéo:', error);
      // Gérez l'erreur, affichez un message d'erreur à l'utilisateur, etc.
      // Affichez simplement le texte de la réponse dans la console
      console.error('Erreur:', error.error.text);
    }
  );
  // Rafraîchir la liste des vidéos ou effectuer toute autre action nécessaire après la suppression
      // Par exemple, réinitialiser l'URL de la vidéo
      this.videoUrl = undefined;
}



onSubmitForm1() {
  this.form2IsLoding = true;
  const form2Loading = document.getElementById("form2Loading");
  form2Loading.style.display = "block";
  form2Loading.style.color = "blueviolet";
  console.log("Start video processing ...  " + this.form2IsLoding);
  if (!this.videoFile) {
    console.error('No file selected.');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.videoFile);

  this.processingService.processVideo(formData).subscribe(
  (response) => {
        console.log(response)
        this.form2IsLoding=false;
        form2Loading.style.display = "none";
        this.showVideo=true;
        this.wordlevel_info = response.wordlevel_info_modified;
        this.videoUrl = response.data_url;
        this.file_path = response.file_path;
        this.result_text = response.result_text;
        console.log('File uploaded successfully:', response);
      },
      (error) => {
        this.form2IsLoding=false;
        form2Loading.style.display = "none";
        console.error('Error uploading file:', error);

        this.displayTranscription();
       
      }
    );
}

displayTranscription() {
  // Construisez la transcription en parcourant les données wordlevel_info
  let transcription = '';
  this.wordlevel_info.forEach(wordInfo => {
    transcription += `${wordInfo.word}(${wordInfo.start}-${wordInfo.end})\n`;
  });
  return transcription;
}





loadData() {
  setTimeout(() => {
    this.isLoading = false;
    this.showContent = true;

  }, 500);
}

ngOnInit(): void {
  this.loadData(); 
  
}

errorMessage: string | null = null; // Initialisez à null pour cacher le message par défaut

startVideoProcessing(): void {
  // Vérifiez si une vidéo a été sélectionnée
  if (!this.videoFile) {
    this.errorMessage = 'Aucune vidéo sélectionnée.';
    console.error(this.errorMessage);
    return;
  }

  // Appelez la méthode de traitement de la vidéo
  this.onSubmitForm1();
  
  this.processingVideo = true;
}


handleVideoMouseOver(event: MouseEvent): void {
  const video = event.target as HTMLVideoElement;
  video.pause();
  // Appeler la fonction pour afficher le tooltip
  this.showVideoWordTooltip(event, video.currentTime);
}

showVideoWordTooltip(event: MouseEvent, currentTime: number): void {
  const matchingWordInfo = this.findMatchingWordInfo(currentTime);
  
  if (matchingWordInfo) {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "block";
    tooltip.style.left = event.clientX + 'px';
    tooltip.style.top = event.clientY + 'px';
    (document.getElementById("keywordInput") as HTMLInputElement).value = matchingWordInfo.word;
    this.Selectedkeyword=matchingWordInfo.word;
  }
}

findMatchingWordInfo(currentTime: number): any {
  // Parcourir la liste des informations sur les mots
  for (let i = 0; i < this.wordlevel_info.length; i++) {
    const wordInfo = this.wordlevel_info[i];
    // Vérifier si le temps actuel est compris entre start et end
    if (currentTime >= parseFloat(wordInfo.start) && currentTime <= parseFloat(wordInfo.end)) {
      return wordInfo;
    }
  }
  return null; // Aucun mot correspondant trouvé
}


cancelHideTooltip(): void {
  clearTimeout(this.tooltipTimeout);
}

hideTooltip(event: MouseEvent): void {
  const tooltip = document.getElementById("tooltip");
  const relatedTarget = (event.relatedTarget || event.target) as HTMLElement;

  // Vérifier si la souris quitte #buttonsContainer, #tooltip ou la vidéo
  if (relatedTarget !== tooltip && !tooltip.contains(relatedTarget)) {
    tooltip.style.display = "none";
  }
}



addOrModifyKeyword(): void {
  if (this.Selectedkeyword && this.Selectedkeyword.trim() !== "") {
    console.log("Keyword ajouté/modifié: " + this.Selectedkeyword);
    this.addedKeywords.push(this.Selectedkeyword);
    this.Selectedkeyword = ''; // Réinitialiser la valeur de l'input après l'ajout
  }
}

deleteKeywords(keyword: string): void {
  // Check if the keyword is not null and not empty after trimming
  if (keyword && keyword.trim() !== "") {
    const index = this.addedKeywords.indexOf(keyword);

    // Check if the keyword exists in the array
    if (index > -1) {
      this.addedKeywords.splice(index, 1); // Remove the keyword from the array
      console.log("Keyword supprimé: " + keyword);
    } else {
      console.log("Keyword non trouvé: " + keyword);
    }
  }
}

// Show modal for creating a new project
showNewVideo(newVideoUpload: TemplateRef<{}>) {
  const modal = this.modalService.create({
    nzTitle: 'Upload New Video Origine',
    nzContent: newVideoUpload,
    nzFooter: [
      {
        label: 'Start Video Processing',
        type: 'primary',
        onClick: () => {
          // Déclencher le traitement de la vidéo lors du clic sur le bouton
          this.startVideoProcessing();
        }
      }
    ],
    nzWidth: 620
  });
}

// Show modal for creating a new project



handleChange(event: any): void {
  if (event.file && event.file.response) {
    this.videoName = event.file.response.name; // Supposons que le serveur renvoie le nom de la vidéo
  }
}

toggleVideoNameVisibility(): void {
  this.isVideoNameVisible = !this.isVideoNameVisible;
}
deleteFileName(): void {
  this.showFileName = false;
}



selectCsvFile(): void {
  // Simulez un clic sur l'élément input de type file
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.csv'; // Limitez la sélection aux fichiers CSV si nécessaire
  fileInput.addEventListener('change', (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fileToUpload = input.files[0];
      this.selectedFileName = this.fileToUpload.name; // Récupérer et afficher le nom du fichier sélectionné
      this.uploadFileToServer(); // Appelez la méthode pour télécharger le fichier immédiatement après la sélection
    }
  });
  fileInput.click();
}


//csv file upload
uploadFileToServer() {
  const formData: FormData = new FormData();
  formData.append('file', this.fileToUpload, this.fileToUpload.name);
  formData.append('keywords', JSON.stringify(this.addedKeywords)); // Utiliser les mots-clés sélectionnés dynamiquement
  formData.append('result_text', JSON.stringify(this.result_text));

  this.http.post<any>('http://localhost:5000/upload_csv', formData).subscribe(
    response => {
      console.log('File uploaded successfully !', response);
    },
    error => {
      console.error('Error uploading file:', error);
      // Traitez l'erreur si nécessaire
    }
  );
}

handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
}


ShowPersonnalizedVideo(videoPath: string) {
  this.router.navigate(['/VideoPersonalization', videoPath]);
  // Construct the complete video URL using the base URL
  const baseURL = 'http://localhost:5000/videos/';
  const videoURL = baseURL + videoPath;

  // Create a modal to display the video
  const modal = this.modalService.create({
    nzTitle: 'Personalized video',
    nzContent: `<video src="${videoURL}" controls autoplay width="100%"></video>`,
    nzFooter: [],
    nzWidth: 900
  });
}

generatePersonalizedVideos(): void {
  // Vérifiez si des mots-clés ont été ajoutés
  if (this.addedKeywords.length === 0) {
    console.error('Aucun mot-clé n\'a été ajouté.');
    return;
  }

  // Vérifiez si un fichier CSV a été téléchargé
  if (!this.fileToUpload) {
    console.error('Aucun fichier CSV téléchargé.');
    return;
  }

  // Vérifiez si une vidéo a été téléchargée
  if (!this.videoFile) {
    console.error('Aucune vidéo téléchargée.');
    return;
  }

  // Construisez les données à envoyer au serveur Flask
  const formData: FormData = new FormData();
  formData.append('file', this.fileToUpload, this.fileToUpload.name);
  formData.append('keywords', JSON.stringify(this.addedKeywords));
  formData.append('result_text', JSON.stringify(this.result_text));
  formData.append('file_path', JSON.stringify(this.file_path));

  // Envoyez les données au serveur Flask pour générer les vidéos personnalisées
  this.http.post<any>('http://localhost:5000/personalized_videos', formData).subscribe(
    response => {

       
  this.dataList = [];
      for (let i = 0; i < response[0].videoPath.length; i++) {
        this.dataList.push({
          firstName: response[1].first_name[i],
          lastName: response[2].last_name[i],
          videoPath: response[0].videoPath[i],
          telephone:response[3].telephone[i],
          email: response[4].email[i]
      
        });
      }
    
      console.log('Vidéos personnalisées générées avec succès:', response);
      this.personalizedVideos = response;
      this.videoPaths = response['videoPath']; // Accédez à la propriété 'videoPath'
      this.personalizedVideosPath="C:/Users/pc/IdeaProjects/VideoPersonalization/personalization-flask-service"+ this.videoPaths;
      console.log(  this.personalizedVideosPath);
      this.message = 'Vidéos personnalisées générées avec succès !';
    
    },
    error => {
      console.error('Erreur lors de la génération des vidéos personnalisées:', error);
      this.message = 'Une erreur est survenue lors de la génération des vidéos personnalisées.';    
    }
  );
  
}




}