import {Component, inject, OnInit, signal} from '@angular/core';
import {TableModule} from "primeng/table";
import {AutorService} from "@service/autor.service";
import {Autor} from "@interface/autor.interface";
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
  selector: 'app-autor-crud',
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
  templateUrl: './autor-crud.component.html',
  styleUrl: './autor-crud.component.css',
})
export class AutorCrudComponent implements OnInit{
  private autorService = inject(AutorService);
  autores = signal<Autor[]>([]);

  loading= signal(true);
  selectedAutors:Autor[] = [];

  autor!: Autor;

  editar = signal(false);
  submitted = signal(false);
  autorDialog = signal(false);

  constructor(private messageService: MessageService,private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){

    this.loading.set(true);

    this.autorService.getAutor().pipe(
      delay(500)
    ).subscribe( autor =>{
      this.autores.set(autor)
      this.loading.set(false);
    } )
  }


  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se ha ocurrido un error al hacer la operación' });
  }

  openNew() {
    this.autor = {apellido1: "", id: 0, nombre: ""};
    this.submitted.set(false);
    this.autorDialog.set(true) ;
  }

  deleteSelectedAutors() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eleminar los autores seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let autor of this.selectedAutors){
          this.autorService.deleteAutor(autor.id).subscribe(value => {
            if (!value)
              this.showError();
            this.cargarDatos();
          })
        }
        this.selectedAutors = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Autores Eliminados', life: 3000 });
      }
    });
  }

  editAutor(autor: Autor) {
    this.autor = { ...autor };
    this.autorDialog.set(true) ;
    this.editar.set(true)
  }

  deleteAutor(autor: Autor) {
    this.confirmationService.confirm({
      message: 'Estás seguro de eleminar ' + autor.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.autorService.deleteAutor(autor.id).subscribe(value => {
          if (value){
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Autor eleminado', life: 3000 });
            this.cargarDatos()
          }else{
            this.showError()
          }
        })
      }
    });
  }

  hideDialog() {
    this.autorDialog.set(false) ;
    this.submitted.set(false);
    this.editar.set(false);
  }

  saveAutor() {
    this.submitted.set(true);
    if (this.editar()){
      this.confirmationService.confirm({
        message: '¿Estás seguro de editar el autor seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.autorService.updateAutor(this.autor).subscribe(value => {
            if (value){
              this.editar.set(false);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha realizado el cambio', life: 3000 });
              this.submitted.set(false);
              this.autorDialog.set(false) ;
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
      this.autorService.addAutor(this.autor).subscribe(value => {
        if (value){
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha creado correctamente', life: 3000 });
          this.autorDialog.set(false);
          this.submitted.set(false);
          this.cargarDatos();
        }else{
          this.showError();
        }
      })
    }
  }

}
