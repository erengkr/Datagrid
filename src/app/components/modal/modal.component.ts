import { Component, Input } from '@angular/core';
import { RowModel } from 'src/app/Models/Model';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(
  ) { }
  @Input() onSubmit:((data: RowModel) => void) | undefined;
  modalStyle: string = 'display:none';
  link: string = '';
  name: string = '';
  description: string = '';

  openModal() {
    this.modalStyle = 'display:block';
  }
  closeModal(){
    this.modalStyle = 'display:none';
  }
  onPressSubmit(){
    this.onSubmit?.({link:this.link,name:this.name,description:this.description});
    this.closeModal();
    this.link='';
    this.name='';
    this.description='';
  }
}

