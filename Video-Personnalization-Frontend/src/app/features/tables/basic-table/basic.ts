import {
  Component,
  Input
} from '@angular/core';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'basic-table',
  template: `

  <div class="p-[25px]">
    <div class="w-full overflow-x-auto">
      <nz-table #basicTable [nzData]="listOfData" [nzFrontPagination]="false" [nzShowPagination]="false">
        <thead>
          <tr>
            <th
              class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-15px font-medium border-none before:hidden rounded-s-[10px] capitalize">
              Name</th>
            <th
              class="bg-regularBG dark:bg-[#323440] px-4 py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden capitalize">
              Age</th>
            <th
              class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[10px] capitalize">
              Action</th>
              <th
              class="bg-regularBG dark:bg-[#323440] px-[20px] py-[16px] text-start text-dark dark:text-white/[.87] text-[15px] font-medium border-none before:hidden rounded-e-[10px] capitalize">
              Video Final Path </th>
          </tr>
        </thead>
        <tbody>
          <tr class="group" *ngFor="let data of basicTable.data">
            <td
              class="ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">
              Alice</td>
            <td
              class="ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">
              Vaillant</td>
            <td
              class="ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">
              <a>Show Video</a>
            </td>
            <td
              class="ltr:pr-4 rtl:pl-4 text-dark dark:text-white/[.87] text-[15px] py-4 before:hidden border-none group-hover:bg-transparent">
              <!-- Affichage personnalisé du chemin de la vidéo final -->
              <div *ngIf="">
            <p>{{ finalVideoPath }}</p>
          
          </div>
            </td>
          </tr>
        </tbody>
      </nz-table>
    </div>
  </div>

`,
})
export class BasicComponent {
  @Input() finalVideoPath: string;
  listOfData: Person[] = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
   
  ];
}
