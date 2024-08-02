import { Component, ViewChild, ElementRef, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Console } from 'console';
import { ClientListServiceService } from 'src/app/service/client-list-service.service';

@Component({
  selector: 'file-selector',
  templateUrl: './file-selector.component.html'
})
export class FileSelectorComponent {
  @ViewChild('fileInput') fileInput!: ElementRef; // Référence à l'élément input
  @Output() fileSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() isExist = new EventEmitter<boolean>();

  isOpen: boolean = true; 
  selectedFile: any;
  Files:any;
  IsExist: boolean = false;

  selectedFilePath:any;



  constructor (private clientListService: ClientListServiceService,private ref: MatDialogRef<FileSelectorComponent>){
  }


  ngOnInit(): void {
    this.getAllClientsLists();
  }


  onFileSelected(fileUrl: string) {
    this.selectedFilePath=fileUrl;
    this.selectedFile = fileUrl;
    this.fileInput.nativeElement.value = fileUrl;
  }

  onCSVFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      this.selectedFilePath = this.selectedFile.name;
  }}

  getFileName(fileUrl: string): string {
    return fileUrl.split('/').pop()?.split('\\').pop() || '';
  }

 

  onConfirm() {
    this.IsExist = this.Files.some(file => file.listUrl === this.selectedFile);
    console.log("this.IsExist "+this.IsExist)
    if(this.IsExist){
      const selectedFileModified = this.selectedFile.replace(/\\/g, '/');
      this.fileSelected.emit(selectedFileModified);
    }else{
      this.fileSelected.emit(this.selectedFile);
    }
    this.isExist.emit(this.IsExist);
    this.onClose();
  }

  onClose() {
    this.ref.close('Closed using function');
  }

  getAllClientsLists() {
    this.clientListService.getAllClientsLists().subscribe(
      (response) => {
        this.Files = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des clients :', error);
      }
    );
  }


  
}
