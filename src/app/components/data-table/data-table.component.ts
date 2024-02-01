import { Component, Input, OnInit } from '@angular/core';
import DataTable from 'datatables.net-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-responsive-dt';
import { DataService } from 'src/app/services/data-service';
import { ModalComponent } from '../modal/modal.component';
import { RowModel } from 'src/app/Models/Model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  table: any;
  @Input() modal: ModalComponent | undefined;

  constructor(private service: DataService) {}
  ngOnInit(): void {
    const self = this;
    this.table = new DataTable('#example', {
      data: this.service.loadData(),
      columns: [{ data: 'link' }, { data: 'name' }, { data: 'description' }],
      dom:
        "<'row' <'col-sm-5  d-flex justify-content-start  ' f ><'col-sm-7  d-flex justify-content-end'B>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'l><'col-sm-7'p>>",

      buttons: [
        {
          text: '<div class="d-flex align-items-center"> <div class="plus">+</div>  <div>Yeni Hesap Ekle </div> </div>',
          attr: {
            id: 'yeniHesapEkle',
            class: 'button',
          },
          action: function () {
            self.modal?.openModal();
          },
        },
      ],
      language: {
        searchPlaceholder: 'Search objects... ',
        search:
          ' <i  class="fa-solid fa-filter filter-button"></i> <button class="searchButton"><i class="fa-solid fa-magnifying-glass"></i></i></button>',

        paginate: {
          previous: '<i class="fas fa-chevron-left"></i>',
          next: '<i class="fas fa-chevron-right"></i>',
        },
        lengthMenu: 'Show:  _MENU_',
      },
      lengthMenu: [
        [4, 8, 16, -1],
        ['4 rows', '8 rows', '16 rows', 'All'],
      ],
    });
  }
  onModalSubmit(data: RowModel) {
    this.service.append(data);
    this.table.row.add(data);
    this.table.draw();
  }
}
