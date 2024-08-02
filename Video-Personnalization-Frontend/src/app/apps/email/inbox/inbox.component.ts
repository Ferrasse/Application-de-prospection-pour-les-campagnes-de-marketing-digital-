import { Component, OnInit, Inject   } from '@angular/core';
import { AppsService } from '../../../shared/services/apps.service';
import { Mail } from '../../../shared/interfaces/mail.type';
import { DOCUMENT } from '@angular/common';
import { EmailMessagesService } from 'src/app/service/email-messages.service';


@Component({
    templateUrl: './inbox.component.html',
})

export class InboxComponent implements OnInit   {
  mails : Mail[];
  allChecked:boolean = false;
  indeterminate:boolean = false;
  isMailListOpen: boolean = true;
  isNavOpen: boolean = false;
  isCompose: boolean = false;
  selectedMail: string = "";
  filter;
  isValid: boolean;
  isClassA = true;
  isLoading = true;
  showContent = false;

  constructor (private mailSvc: AppsService,@Inject(DOCUMENT) private document: Document,private emailMessagesService: EmailMessagesService) {}

  extractDetail(email: string, detail: string): string {
    const regex = new RegExp(`${detail}:\\s*([^\\n]*)`, 'i');
    const match = email.match(regex);
    if (match) {
      let detailText = match[1];
      if (detail === 'From') {
        const fromRegex = /(?:[^<]*\b)(\w+)/;
        const fromMatch = detailText.match(fromRegex);
        if (fromMatch) {
          detailText = fromMatch[1].trim();
        }
      }
      return detailText;
    }
    return '';
  }

  
  ngOnInit(): void {
    const username = 'rachida.ferras@gmail.com'; 
    const password = 'jhfh qjfn hfpc gnkc';
    const folder ='INBOX' 

    this.emailMessagesService.getEmails(username, password,folder).subscribe(
      (data) => {
        this.mails = data;
      },
      (error) => {
        console.error('Error fetching emails', error);
      }
    );
  
    this.isValid = true;
    // Simulate loading time
    this.loadData();
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
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

  formatBody = function(body:string) {
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

  /* Editor */
  isDarkMode(): boolean {
    return this.document.body.classList.contains('dark');
  }

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

    /*---------  Full screen Window  ----------*/
    toggleClass() {
      this.isClassA = !this.isClassA;
    }
}
