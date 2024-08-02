import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import {
  AppsService
} from '../../../shared/services/apps.service';
import {
  Mail
} from '../../../shared/interfaces/mail.type';
import {
  DOCUMENT
} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FileSelectorComponent } from './file-selector.component';
import { ClientListServiceService } from 'src/app/service/client-list-service.service';
import { EmailMessagesService } from 'src/app/service/email-messages.service';
import { ClientList } from 'src/app/models/clients-list.model';



@Component({
  selector: 'app-inbox-sidebar',
  template: `
 <style>
    li.flex span {
    display: inline-flex;
    align-items: center;
    padding-right: 30px;
   }
   li.flex i {
    padding-right: 20px;
   }

   .autocomplete-subject-suggestions {
    border: 1px solid #ccc;
    max-height: 150px;
    overflow-y: auto;
    position: absolute;
    background-color: white;
    list-style-type: none;
    padding: 0;
    margin: 0;
    z-index: 1000;
    margin-top: 100px; 
  }
  
  .autocomplete-subject-suggestions li {
    padding: 5px;
    cursor: pointer;
  }
  
  .autocomplete-subject-suggestions li:hover {
    background-color: #ddd;
  }




  .autocomplete-suggestions {
    border: 1px solid #ccc;
    max-height: 150px;
    overflow-y: auto;
    position: absolute;
    background-color: white;
    list-style-type: none;
    padding: 0;
    margin: 0;
    z-index: 1000; /* Ensure the suggestions list appears above other elements */
  }
  
  .autocomplete-suggestions li {
    padding: 5px;
    cursor: pointer;
  }
  
  .autocomplete-suggestions li:hover {
    background-color: #ddd;
  }
  
  </style>
  <div class="flex items-center justify-center lg:hidden">
  <a class=" dark:text-white/[.87] h-[40px] px-[10px] gap-1.5 text-sm font-semibold inline-flex items-center bg-white dark:bg-white/10 rounded-4" (click)="openNav()">
    <span class="text-[18px]" nz-icon nzType="menu" nzTheme="outline"></span>
  </a>
</div>
<div class="bg-white dark:bg-[#1b1c29] lg:rounded-[10px] max-lg:rounded-r-[10px] max-lg:w-[280px] max-lg:fixed max-lg:z-[11] max-lg:left-0 [&.nav-open]:translate-x-0 max-lg:top-[70px] max-lg:h-full max-lg:translate-x-[-280px] max-lg:shadow-lg duration-200" [ngClass]="{'nav-open': isNavOpen}">
    <div class="flex items-center justify-end mt-[20px] lg:hidden">
      <a class="text-danger text-sm font-semibold inline-flex items-center px-[15px]" (click)="openNav()">
        <span class="text-[19px]" nz-icon nzType="close" nzTheme="outline"></span>
      </a>
    </div>
  <div class="px-[30px] pt-[30px]">
    <button type="button" nz-button nzType="primary" nzBlock (click)="compose()" class="w-full flex items-center justify-center dark:text-white/[.87] h-11 px-[20px] gap-1.5 text-sm font-semibold rounded-[20px] bg-primary text-white">
      <span class="[&>svg]:w-[15px] [&>svg]:h-[15px]" nz-icon nzType="plus" nzTheme="outline"></span>
      <span class="m-0">New message</span>
    </button>
  </div>
  <div class="p-[15px]">
    <ul class="bg-transparent border-none" nz-menu [nzMode]="'inline'">
      <li class="flex items-center" nz-menu-item (click)="closeMail()" [routerLink]="['/apps/email/inbox']" routerLinkActive="ant-menu-item-selected">
        <i class="[&>svg]:w-[14px] [&>svg]:h-[14px] text-light-extra dark:text-white/60 group-hover:text-primary" nz-icon nzType="inbox" theme="outline"></i>
        <span class="justify-between flex-auto m-0 text-[15px] font-normal group-hover:text-primary">
          <span>Inbox</span>
          <span class="flex items-center justify-center bg-primary/[.15] text-primary h-[20px] px-[6.5px] text-[11px] rounded-[10px]">3</span>
        </span>
      </li>

      <li class="flex items-center px-[15px] py-[10px] gap-[15px] rounded-md group text-theme-gray dark:text-white/60 m-0 [&.ant-menu-item-selected]:text-primary [&.ant-menu-item-selected>i>svg]:text-primary" nz-menu-item (click)="closeMail()" [routerLink]="['/apps/email/star']" routerLinkActive="ant-menu-item-selected">
        <i class="[&>svg]:w-[14px] [&>svg]:h-[14px] text-light-extra dark:text-white/60 group-hover:text-primary" nz-icon nzType="star" theme="outline"></i>
        <span class="justify-between flex-auto m-0 text-[15px] font-normal group-hover:text-primary">
          <span>Stared</span>
        </span>
      </li>
      <li class="flex items-center px-[15px] py-[10px] gap-[15px] rounded-md group text-theme-gray dark:text-white/60 m-0 [&.ant-menu-item-selected]:text-primary [&.ant-menu-item-selected>i>svg]:text-primary" nz-menu-item (click)="closeMail()">
        <i class="[&>svg]:w-[14px] [&>svg]:h-[14px] text-light-extra dark:text-white/60 group-hover:text-primary" nz-icon nzType="send" theme="outline"></i>
        <span class="justify-between flex-auto m-0 text-[15px] font-normal group-hover:text-primary">
          <span>Send</span>
        </span>
      </li>
      <li class="flex items-center px-[15px] py-[10px] gap-[15px] rounded-md group text-theme-gray dark:text-white/60 m-0 [&.ant-menu-item-selected]:text-primary [&.ant-menu-item-selected>i>svg]:text-primary" nz-menu-item (click)="closeMail()">
        <i class="[&>svg]:w-[14px] [&>svg]:h-[14px] text-light-extra dark:text-white/60 group-hover:text-primary" nz-icon nzType="form" theme="outline"></i>
        <span class="justify-between flex-auto m-0 text-[15px] font-normal group-hover:text-primary">
          <span>Draft</span>
          <span class="flex items-center justify-center bg-primary/[.15] text-primary h-[20px] px-[6.5px] text-[11px] rounded-[10px]">12</span>
        </span>
      </li>
      <li class="flex items-center px-[15px] py-[10px] gap-[15px] rounded-md group text-theme-gray dark:text-white/60 m-0 [&.ant-menu-item-selected]:text-primary [&.ant-menu-item-selected>i>svg]:text-primary" nz-menu-item (click)="closeMail()">
        <i class="[&>svg]:w-[14px] [&>svg]:h-[14px] text-light-extra dark:text-white/60 group-hover:text-primary" nz-icon nzType="exclamation-circle" theme="outline"></i>
        <span class="justify-between flex-auto m-0 text-[15px] font-normal group-hover:text-primary">
          <span>Spam</span>
        </span>
      </li>
      <li class="flex items-center px-[15px] py-[10px] gap-[15px] rounded-md group text-theme-gray dark:text-white/60 m-0 [&.ant-menu-item-selected]:text-primary [&.ant-menu-item-selected>i>svg]:text-primary" nz-menu-item (click)="closeMail()">
        <i class="[&>svg]:w-[14px] [&>svg]:h-[14px] text-light-extra dark:text-white/60 group-hover:text-primary" nz-icon nzType="delete" theme="outline"></i>
        <span class="justify-between flex-auto m-0 text-[15px] font-normal group-hover:text-primary">
          <span>Trash</span>
        </span>
      </li>
      <li class="mt-[25px]" nz-menu-group>
        <h6 title class="text-[#9299b8] dark:text-white/60 text-xs ms-[-5px] text-start">Labels</h6>
        <ul>
          <li class="relative flex items-center bg-transparent text-body dark:text-white/60 px-[15px] py-[10px] gap-[15px] rounded-md capitalize hover:bg-primary/10 hover:text-primary font-normal text-[15px] group m-0" nz-menu-item>
            <a href="#" class="flex text-theme-gray dark:text-white/60 items-center gap-[15px] font-normal text-[15px]">
              <span class="[&>svg]:w-[14px] [&>svg]:h-[14px]" nz-icon nzType="unordered-list" nzTheme="outline"></span> personal </a>
          </li>
          <li class="relative flex items-center bg-transparent text-body dark:text-white/60 px-[15px] py-[10px] gap-[15px] rounded-md capitalize hover:bg-primary/10 hover:text-primary font-normal text-[15px] group m-0" nz-menu-item>
            <a href="#" class="flex items-center gap-[15px] font-normal text-[15px]">
              <span class="[&>svg]:w-[14px] [&>svg]:h-[14px]" nz-icon nzType="unordered-list" nzTheme="outline"></span> social </a>
          </li>
          <li class="relative flex items-center bg-transparent text-body dark:text-white/60 px-[15px] py-[10px] gap-[15px] rounded-md capitalize hover:bg-primary/10 hover:text-primary font-normal text-[15px] group m-0" nz-menu-item>
            <a href="#" class="flex items-center gap-[15px] font-normal text-[15px]">
              <span class="[&>svg]:w-[14px] [&>svg]:h-[14px]" nz-icon nzType="unordered-list" nzTheme="outline"></span> promotions </a>
          </li>
          <li class="relative flex items-center bg-transparent text-light dark:text-white/60 px-[15px] py-[10px] gap-[15px] rounded-md capitalize hover:bg-primary/10 hover:text-primary font-normal text-[15px] group m-0 border-none" nz-menu-item>
            <a class="flex items-center gap-[10px] text-light dark:text-white/60 font-normal text-[15px]
                group-hover:text-primary" nz-dropdown [nzDropdownMenu]="label" nzTrigger="click" (nzVisibleChange)="handleDropdownVisibleChange($event)">
              <span class="[&>svg]:w-[14px] [&>svg]:h-[14px]" nz-icon nzType="plus" nzTheme="outline"></span> Add New Label <nz-dropdown-menu #label="nzDropdownMenu">
                <div class="relative ltr:left-1/2 rtl:right-1/2 -translate-x-1/2 bg-white dark:bg-[#1b1b28] w-[calc(100% + 60px)] px-[30px] py-[25px] rounded-lg shadow-boxLarge dark:shadow-[0_5px_30px_rgba(1,4,19,.60)]">
                  <form>
                    <h1 class="mb-4 text-base font-medium text-dark dark:text-white/[.87]">Add New Label</h1>
                    <input type="text" placeholder="Enter label name" class="bg-white border rounded-sm ant-input dark:bg-white/10 h-11 text-body dark:text-white/60 dark:border-white/10" value="">
                    <div class="flex items-center flex-wrap mt-[10px] -mx-[5px] -mb-[5px]">
                      <button nz-button class="bg-primary hover:bg-primary-hbr h-[38px] m-[5px] px-5 text-white dark:text-white/[.87] text-sm font-semibold rounded border-primary">
                        <span>Add Label</span>
                      </button>
                      <button nz-button nzType="default" class="bg-transparent hover:bg-primary hover:border-primary border-regular dark:border-white/10 dark:text-white/[.87] text-dark hover:text-white h-[38px] m-[5px] px-5 text-sm font-semibold rounded" (click)="cancelLabelCreation()">
                        <span>Cancel</span>
                      </button>
                    </div>
                  </form>
                </div>
              </nz-dropdown-menu>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
<div
  [ngClass]="isClassA ? 'fixed bg-white dark:bg-[#212e3d] w-full rounded-[10px] shadow-[0_10px_50px_rgba(146,153,184,.19)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] md:max-w-[600px] max-md:max-w-[400px] max-ssm:max-w-[240px] ltr:right-[15px] rtl:left-[15px] z-[999] top-[59%] translate-y-[-50%]' : 'fixed bg-white dark:bg-[#212e3d] w-full rounded-[10px] shadow-[0_10px_50px_rgba(146,153,184,.19)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] max-w-[1200px] ltr:right-[0] rtl:left-[0] z-[9998] top-[50%] translate-y-[-50%]'"
  *ngIf="isCompose">
  <div
    class="flex items-center justify-between bg-dark dark:bg-[#323540] p-5 text-white dark:text-white/[.87] rounded-tl-10 rounded-tr-10">
    <h6 class="text-white dark:text-white/[.87]">New message</h6>
    <div class="flex items-center gap-[10px]">
      <div
        [ngClass]=" {'[&.active>.hidden]:flex [&.active>.flex]:hidden': isClassA, 'active [&.active>.hidden]:flex [&.active>.flex]:hidden': !isClassA}">
        <button nz-button class="text-white bg-transparent border-none dark:text-white/[.87] screen flex items-center"
          nz-icon nzType="fullscreen" nzTheme="outline" (click)="toggleClass()"></button>
        <button nz-button class="text-white bg-transparent border-none dark:text-white/[.87] screen hidden items-center"
          nz-icon nzType="fullscreen-exit" nzTheme="outline" (click)="toggleClass()"></button>
      </div>
      <button nz-button class="text-white bg-transparent border-none dark:text-white/[.87] flex items-center"
        (click)="closeMail()" nz-icon nzType="close" nzTheme="outline"></button>
    </div>
  </div>
  <div class="pb-[30px] px-[30px] max-3xl:h-[300px] max-md:h-[245px] overflow-x-auto">
    <div class="flex gap-5">
      <div class="static w-full rounded-10 z-998">
        <div class="relative flex items-center gap-2.5 border-b border-regular dark:border-white/10 w-full min-h-[50px]">
        <label>
          <input type="radio" checked="ckecked" name="timeChoice" [(ngModel)]="choice" value="now">
          Now
        </label>
        <label>
          <input type="radio" name="timeChoice" [(ngModel)]="choice" value="later">
          Later
        </label>
        <div *ngIf="choice === 'later'">
          <input type="date" id="date" [(ngModel)]="date" name="date">
          <input type="time" id="time" [(ngModel)]="time" name="time">
        </div>
        </div>

        <div class="relative flex items-center w-full border-b border-regular dark:border-white/10">  
          <div class="relative flex items-center gap-2.5 min-h-[50px]">
            <button (click)="showPopup()" class="text-[13px] text-theme-gray dark:text-white/60 hover:text-primary">
              <span nz-icon nzType="link" nzTheme="outline"></span> Choose your clients file
            </button>
          </div>
        </div>
        <p *ngIf="selectedFile">Selected File :{{getFileName(this.selectedFile)}}</p>


        <div class="relative flex items-center gap-2.5 border-b border-regular dark:border-white/10 w-full min-h-[50px]">
            <input
              [(ngModel)]="subject"
              #subjectInput
              class="text-dark dark:text-white/[.87] border-none bg-white dark:bg-[#212e3d] shadow-none placeholder:text-theme-gray dark:placeholder:text-white/60"
              nz-input
              placeholder="Subject"
              (keydown)="onInputKeydown($event)"
            />
            <ul *ngIf="subjectSuggestions.length > 0" class="autocomplete-subject-suggestions">
              <li *ngFor="let suggestion of subjectSuggestions" (click)="selectSubjectSuggestion(suggestion)">
                {{ suggestion }}
              </li>
            </ul>
          </div>
          
        <div class="relative flex items-center gap-2.5 border-b border-regular dark:border-white/10 w-full min-h-[50px]">
            <textarea 
            [(ngModel)]="message"
            #messageTextarea class="text-dark dark:text-white/[.87] border-none bg-white dark:bg-[#212e3d] shadow-none placeholder:text-theme-gray dark:placeholder:text-white/60"
                      placeholder="Enter your message" rows="9" cols="80" (keyup)="onTextareaInput($event)"></textarea>
            <ul *ngIf="suggestions.length > 0" class="autocomplete-suggestions">
              <li *ngFor="let suggestion of suggestions" (click)="selectSuggestion(suggestion)">
                {{ suggestion }}
              </li>
            </ul>
          </div>

          <div>
            <p>NB : Use curly braces {{ '{' }}{{ '}' }} for variables.</p>
          </div>

           

      </div>
    </div>
  </div>
  <div class="flex items-center justify-between pt-[20px] border-t border-regular dark:border-white/10 px-[30px] pb-[30px]">
    <div class="flex items-center gap-[15px]">
      <button nz-button class="h-[44px] px-[20px] rounded-4 bg-primary text-white border-primary" (click)="sendEmail()">
        <span>Send</span>
      </button>
     
      <a href="#" class="text-[13px] text-theme-gray dark:text-white/60 hover:text-primary">
        <span nz-icon nzType="question-circle" nzTheme="outline"></span>
      </a>
    </div>
    <div class="flex items-center">
      <button nz-button class="
            text-[15px] text-theme-gray dark:text-white/60 hover:text-primary bg-transparent border-none"
        (click)="closeMail()">
        <span nz-icon nzType="delete" nzTheme="outline"></span>
      </button>
    </div>
  </div>
</div>
`,
})

export class InboxSidebar implements OnInit {
  mails: Mail[];
  allChecked: boolean = false;
  indeterminate: boolean = false;
  isMailListOpen: boolean = true;
  isNavOpen: boolean = false;
  isCompose: boolean = false;
  selectedMail: string = "";
  filter;
  isValid: boolean;
  isClassA = true;
  csvColumns: string[] = [];
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('messageTextarea', { static: false }) messageTextarea: ElementRef;
  @ViewChild('subjectInput') subjectInput!: ElementRef;
  variable=false;
  subjectVariable=false;
  suggestions: string[] = [];
  subjectSuggestions: string[] = [];

  isExist: boolean =false;

  subject: string = '';
  message: string = '';
  date: any;
  time:any;
  choice: string = 'now';

  csv_file_Id:any;


  constructor(private renderer: Renderer2,private el: ElementRef, public dialog: MatDialog, private mailSvc: AppsService, @Inject(DOCUMENT) private document: Document,
private clientListService: ClientListServiceService,private emailService: EmailMessagesService) {}


ngOnInit(): void {
  this.mailSvc.getMailJson().subscribe(
    (data: Mail[]) => {
      this.mails = data;
    },
    (error: any) => {
      console.error('Error fetching mail data:', error);
    }
  );
  this.isValid = true;
  setInterval(() => this.checkFile(), 3000);
}
getFormattedTime(): string {
  return this.time ? `${this.time}:00` : '';
}

sendEmail() {
  if(this.choice=="now"){
    console.log("choice : "+this.choice)
    this.time='';
    this.date='';
  }

  if(!this.isExist){
    this.clientListService.addClientsList(this.selectedFile).subscribe(
      (response : ClientList) => {
        console.log('CSV uploaded successfully:', response);
        console.log('File uploaded successfully. ID:', response.id);
        this.csv_file_Id=response.id;
        this.selectedFile=response.listUrl;
        console.log('New csv path:', response.listUrl);


        const emailRequest = {
          senderEmail: 'elbouhdidi2018@gmail.com', 
          senderPassword: 'yglc racb rbjn xsdu', 
          message: this.message,
          subject:this.subject,
          csvFilePath: this.selectedFile,
          date:this.date,
          time:this.getFormattedTime()
        };
    
        console.log("emailRequest csv file path : "+emailRequest.csvFilePath)
      
        this.emailService.sendEmail(emailRequest).subscribe(() => {
          console.log('Email envoyé avec succès');
          this.subject = '';
          this.message = '';
          this.selectedFile = null;
          this.suggestions=null;
          this.subjectSuggestions=null;
          this.choice='now';
          this.closeMail();
        }, error => {
          console.error('Erreur lors de l\'envoi de l\'email :', error);
        });
      },
      (error) => {
        console.error('Error uploading CSV:', error);
      }
    );

  }else{
    const emailRequest = {
      senderEmail: 'elbouhdidi2018@gmail.com', 
      senderPassword: 'yglc racb rbjn xsdu', 
      message: this.message,
      subject:this.subject,
      csvFilePath: this.selectedFile,
      date:this.date,
      time:this.getFormattedTime()
    };

    console.log("emailRequest csv file path : "+emailRequest.csvFilePath)
  
    this.emailService.sendEmail(emailRequest).subscribe(() => {
      console.log('Email envoyé avec succès');
      this.subject = '';
      this.message = '';
      this.selectedFile = null;
      this.suggestions=null;
      this.subjectSuggestions=null;
      this.choice='now'
      this.closeMail();
    }, error => {
      console.error('Erreur lors de l\'envoi de l\'email :', error);
    });
  }

  
}

selectedFile: any;

showPopup(): void {
  const dialogRef = this.dialog.open(FileSelectorComponent, {
    width: '612px',
    height: '651.5px',
  });

  dialogRef.componentInstance.fileSelected.subscribe((file: string) => {
    this.selectedFile = file; 
    console.log('Fichier sélectionné dans le composant parent :', this.selectedFile);
  });

  dialogRef.componentInstance.isExist.subscribe((exists: boolean) => {
    this.isExist = exists; 
    console.log('Fichier existant dans le composant parent :', this.isExist);
  });

  dialogRef.afterOpened().subscribe(() => {
    const dialogElement = this.el.nativeElement.querySelector('.mat-dialog-container');
    if (dialogElement) {
      this.renderer.setStyle(dialogElement, 'z-index', '9999');
    }
  });

}

getFileName(fileUrl: any): any {
  if(this.isExist){
    return fileUrl.split('/').pop()?.split('\\').pop() || '';
  }else{
    return fileUrl.name;
  }
}

checkFile() {
  console.log("hellooo ok "+this.isExist)
  if(this.selectedFile) {
    if(this.isExist) {
      this.readCSVFileFromPath(this.selectedFile);
    } else {
      this.readCSVFile(this.selectedFile);  
    }
  } else {
    console.log("Selected file is undefined.");
  }
}

readCSVFile(file: File) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const csvData = event.target.result as string;
    this.parseCSV(csvData);
  };
  reader.readAsText(file);
}


readCSVFileFromPath(filePath: string) {
  this.clientListService.getCsvFileRows(filePath).subscribe(
    (csvData: string) => {
      console.log(" from service side : "+csvData)
      this.parseCSV(csvData);
    },
    (error: any) => {
      console.error('Error reading CSV file:', error);
    }
  );
}

parseCSV(csvData: string) {
  // Supprimer les caractères `[` au début et `]` à la fin de la chaîne
  csvData = csvData.replace(/^\[|\]$/g, '');

  const rows = csvData.split('\n');
  const header = rows[0].split(',');
  this.csvColumns = header.map(col => col.trim());
  console.log('Colonnes CSV : ', this.csvColumns);
}

onTextareaInput(event: KeyboardEvent) {
  const key = event.key;

  if (key) {
    console.log("Key pressed:", key);

    if (key === '{') {
      this.variable = true;
      this.showAutoComplete();
    } else if (key === '}') {
      this.variable = false;
      this.suggestions = [];
    } else {
      this.filterSuggestions();
    }
  } else {
    console.log("Key is undefined");
  }
}

showAutoComplete() {
  const textarea = this.messageTextarea.nativeElement;
  const cursorPosition = textarea.selectionStart;
  const textBeforeCursor = textarea.value.substring(0, cursorPosition);
  const match = textBeforeCursor.match(/{(\w*)$/);
  if (match) {
    this.suggestions = this.csvColumns;
    console.log("hiiiiiiiiiiiii "+this.suggestions)
  }
}

filterSuggestions() {
  if (this.variable) {
    const textarea = this.messageTextarea.nativeElement;
    const cursorPosition = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPosition);
    const match = textBeforeCursor.match(/{(\w*)$/);
    if (match) {
      const typedWord = match[1];
      this.suggestions = this.csvColumns.filter(column =>
        column.startsWith(typedWord)
      );
    }
  }
}

selectSuggestion(suggestion: string) {
  const textarea = this.messageTextarea.nativeElement;
  const cursorPosition = textarea.selectionStart;
  const textBeforeCursor = textarea.value.substring(0, cursorPosition);
  const match = textBeforeCursor.match(/{(\w*)$/);
  if (match) {
    const startPos = cursorPosition - match[1].length;
    const textAfterCursor = textarea.value.substring(cursorPosition);
    textarea.value = textBeforeCursor.substring(0, startPos) + suggestion + textAfterCursor;
    textarea.selectionStart = textarea.selectionEnd = startPos + suggestion.length;
    this.suggestions = [];
  }
}






onInputKeydown(event: KeyboardEvent) {
  const key = event.key;

  if (key) {
    console.log("Key pressed:", key);

    if (key === '{') {
      this.subjectVariable = true;
      this.showSubjectAutoComplete();
    } else if (key === '}') {
      this.subjectVariable = false;
      this.subjectSuggestions = [];
    } else {
      this.filterSubjectSuggestions();
    }
  } else {
    console.log("Key is undefined");
  }
}
showSubjectAutoComplete() {
  const input = this.subjectInput.nativeElement;
  const cursorPosition = input.selectionStart;
  const textBeforeCursor = input.value.substring(0, cursorPosition);
  const match = textBeforeCursor.match(/{(\w*)$/);
  if (match) {
    this.subjectSuggestions = this.csvColumns;
  }
}

filterSubjectSuggestions() {
  if (this.subjectVariable) {
    const input = this.subjectInput.nativeElement;
    const cursorPosition = input.selectionStart;
    const textBeforeCursor = input.value.substring(0, cursorPosition);
    const match = textBeforeCursor.match(/{(\w*)$/);
    if (match) {
      const typedWord = match[1];
      this.subjectSuggestions = this.csvColumns.filter(column =>
        column.startsWith(typedWord)
      );
    }
  }
}

selectSubjectSuggestion(suggestion: string) {
  const input = this.subjectInput.nativeElement;
  const cursorPosition = input.selectionStart;
  const textBeforeCursor = input.value.substring(0, cursorPosition);
  const match = textBeforeCursor.match(/{(\w*)$/);
  if (match) {
    const startPos = cursorPosition - match[1].length;
    const textAfterCursor = input.value.substring(cursorPosition);
    input.value = textBeforeCursor.substring(0, startPos) + suggestion + textAfterCursor;
    input.selectionStart = input.selectionEnd = startPos + suggestion.length;
    this.subjectSuggestions = [];
  }
}

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.mails.forEach(item => item.checked = true);
    } else {
      this.mails.forEach(item => item.checked = false);
    }
  }

  updateSingleChecked(): void {
    if (this.mails.every(item => item.checked === false)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.mails.every(item => item.checked === true)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  formatBody = function (body: string) {
    return body.replace(/<(?:.|\n)*?>/gm, ' ');
  }

  openMail(mail: string) {
    this.selectedMail = mail;
    this.isMailListOpen = false;
  }

  closeMail() {
    this.selectedMail = '';
    this.isMailListOpen = true;
    this.isCompose = false;
  }

  openNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  compose() {
    this.selectedMail = '';
    this.isMailListOpen = true;
    this.isCompose = true;
  }

  isDarkMode(): boolean {
    return this.document.body.classList.contains('dark');
  }

  /* Editor */


  /* --- Cancel Button --- */
  isDropdownOpen = false;

  // Other component code...

  handleDropdownVisibleChange(isOpen: boolean): void {
    this.isDropdownOpen = isOpen;
  }

  cancelLabelCreation(): void {
    this.isDropdownOpen = false;
  }

  /* --- Show and hide div --- */
  showDiv = false;

  toggleDiv() {
    this.showDiv = !this.showDiv;
  }

  hideDiv() {
    this.showDiv = false;
  }

  /*--------- Full screen Window ----------*/
  toggleClass() {
    this.isClassA = !this.isClassA;
  }
}
