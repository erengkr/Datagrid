import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { RowModel } from '../Models/Model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  append(rowModel: RowModel) {
    const data = this.loadData();
    data.push(rowModel);
    this.saveData(data);
  }
  saveData(data: RowModel[]) {
    localStorage.setItem('data', JSON.stringify(data));
  }
  loadData() {
    return JSON.parse(localStorage.getItem('data') || '[]') as RowModel[];
  }
}
