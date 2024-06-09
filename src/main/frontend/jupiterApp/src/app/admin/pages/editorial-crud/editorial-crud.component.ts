import {Component, inject, OnInit, signal} from '@angular/core';
import {TableModule} from "primeng/table";
import {EditorialService} from "@service/editorial.service";
import {Editorial} from "@interface/editorial.interface";
import {delay} from "rxjs";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-editorial-crud',
  standalone: true,
  imports: [
    ButtonModule,
    RippleModule,
    ToolbarModule,
    ToastModule,
    TableModule,
    DialogModule,
    FormsModule,
    ConfirmDialogModule,
    InputTextModule,
    CommonModule
  ],
  templateUrl: './editorial-crud.component.html',
  styleUrl: './editorial-crud.component.css',
})
export class EditorialCrudComponent implements OnInit{
  private editorialService = inject(EditorialService);
  editoriales = signal<Editorial[]>([]);

  loading= signal(true);
  selectedEditorials:Editorial[] = [];

  editorial!: Editorial;

  editar = signal(false);
  submitted = signal(false);
  editorialDialog = signal(false);

  constructor(private messageService: MessageService,private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){

    this.loading.set(true);

    this.editorialService.getEditorial().pipe(
      delay(500)
    ).subscribe( editorial =>{
      this.editoriales.set(editorial)
      this.loading.set(false);
    } )
  }


  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se ha ocurrido un error al hacer la operación' });
  }

  openNew() {
    this.editorial = {id: 0, nombre: ""};
    this.submitted.set(false);
    this.editorialDialog.set(true) ;
  }

  deleteSelectedEditorials() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eleminar los editoriales seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let editorial of this.selectedEditorials){
          this.editorialService.deleteEditorial(editorial.id).subscribe(value => {
            if (!value)
              this.showError()

            this.cargarDatos();
          })
        }
        this.selectedEditorials = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Editoriales Eliminados', life: 3000 });
      }
    });
  }

  editEditorial(editorial: Editorial) {
    this.editorial = { ...editorial };
    this.editorialDialog.set(true) ;
    this.editar.set(true)
  }

  deleteEditorial(editorial: Editorial) {
    this.confirmationService.confirm({
      message: 'Estás seguro de eleminar ' + editorial.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.editorialService.deleteEditorial(editorial.id).subscribe(value => {
          if (value){
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Editorial eleminado', life: 3000 });
            this.cargarDatos()
          }else{
            this.showError()
          }
        })
      }
    });
  }

  hideDialog() {
    this.editorialDialog.set(false) ;
    this.submitted.set(false);
    this.editar.set(false);
  }

  saveEditorial() {
    this.submitted.set(true);
    if (this.editar()){
      this.confirmationService.confirm({
        message: '¿Estás seguro de editar el editorial seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.editar.set(false);
          this.editorialService.updateEditorial(this.editorial).subscribe(value => {
            if (value){
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha realizado el cambio', life: 3000 });
              this.submitted.set(false);
              this.editorialDialog.set(false) ;
              this.cargarDatos()
            }else{
              this.showError()
            }
          })
        },
        reject:() =>{
          this.editar.set(false);
        }
      });
    }else{
      this.editorialService.addEditorial(this.editorial).subscribe(value => {
        if (value){
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha creado correctamente', life: 3000 });
          this.submitted.set(false);
          this.editorialDialog.set(false);
          this.cargarDatos();
        }else{
          this.showError();
        }
      })
    }
  }

}
