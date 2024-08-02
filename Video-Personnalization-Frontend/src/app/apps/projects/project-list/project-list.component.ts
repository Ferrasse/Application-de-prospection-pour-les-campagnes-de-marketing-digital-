import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { AppsService } from '../../../shared/services/apps.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProjectList } from '../../../shared/interfaces/project-list.type';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  // Component properties
  view: string = 'cardView';
  newProject: boolean = false;
 

  isLoading = true;
  showContent = false;

 
  showVideo = false;
  passwordVisible = false;
  password?: string;
  Selectedkeyword: string = '';

  form2IsLoding=false;


  videoFile: File | undefined;
  wordlevel_info: any[] = [];
  data_url: any;
  file_path: any;
  result_text: any;
  addedKeywords: string[] = [];

  tooltipTimeout:any;
  

  
  constructor(private http: HttpClient,private modalService: NzModalService) { }

  onFileSelected(event: any) {
    this.videoFile = event.target.files[0] as File;
  }

  onSubmitForm1() {
    this.form2IsLoding = true;
    const form2Loading = document.getElementById("form2Loading");
    form2Loading.style.display = "block";
    form2Loading.style.color = "blueviolet";
    console.log("helooooooooooo "+this.form2IsLoding);
    if (!this.videoFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.videoFile);
    

    this.http.post<any>('http://localhost:5000/process_video', formData).subscribe(
      (response) => {
        console.log(response)
        this.form2IsLoding=false;
        form2Loading.style.display = "none";
        this.showVideo=true;
        this.wordlevel_info = response.wordlevel_info_modified;
        this.data_url = response.data_url;
        this.file_path = response.file_path;
        this.result_text = response.result_text;
        console.log('File uploaded successfully:', response);
      },
      (error) => {
        this.form2IsLoding=false;
        form2Loading.style.display = "none";
        console.error('Error uploading file:', error);
      }
    );
  }


  

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
  
    }, 500);
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
  
  

   // Show modal for creating a new project
   showNewVideo(newVideoUpload: TemplateRef<{}>) {
    const modal = this.modalService.create({
      nzTitle: 'Create New Primary Video',
      nzContent: newVideoUpload,
      nzFooter: [
        {
          label: 'Start Video Processing',
          type: 'primary',
          onClick: () =>
            this.modalService.confirm({
              nzTitle: 'Are you sure you want to create this project?',
              nzOnOk: () => this.modalService.closeAll()
            })
        }
      ],
      nzWidth: 620
    });
  }


  
}