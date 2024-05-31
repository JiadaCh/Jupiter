import {Component, inject, OnInit, signal} from "@angular/core";
import {TableModule} from "primeng/table";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {MultiSelectModule} from "primeng/multiselect";
import {PaginatorModule} from "primeng/paginator";
import {CommonModule} from "@angular/common";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {GeneroService} from "@service/genero.service";
import {Genero} from "@interface/genero.interface";
import {ConfirmationService, MessageService} from "primeng/api";
import {delay} from "rxjs";


@Component({
  selector: 'app-genero-crud',
  standalone: true,
  imports: [TableModule, IconFieldModule, InputIconModule, InputTextModule, MultiSelectModule, PaginatorModule, CommonModule, TagModule, InputTextModule, ButtonModule, RippleModule, ToastModule, ToolbarModule, ConfirmDialogModule, DialogModule],
  templateUrl: './genero-crud.component.html',
  styleUrl: './genero-crud.component.css',
})
export class GeneroCrudComponent implements OnInit{
  private generoService = inject(GeneroService);
  generos = signal<Genero[]>([]);

  loading= signal(true);
  selectedGeneros:Genero[] = [];

  genero!: Genero;

  editar = signal(false);
  submitted = signal(false);
  generoDialog = signal(false);

  constructor(private messageService: MessageService,private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(){

    this.loading.set(true);

    this.generoService.getGenero().pipe(
      delay(500)
    ).subscribe( genero =>{
      this.generos.set(genero)
      this.loading.set(false);
    } )
  }


  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se ha ocurrido un error al hacer la operación' });
  }

  openNew() {
    this.genero = {id: 0, nombre: ""};
    this.submitted.set(false);
    this.generoDialog.set(true) ;
  }

  deleteSelectedGeneros() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eleminar los generos seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let genero of this.selectedGeneros){
          this.generoService.deleteGenero(genero.id).subscribe(value => {
            if (!value)
              this.showError()

            this.cargarDatos();
          })
        }
        this.selectedGeneros = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Generoes Eliminados', life: 3000 });
      }
    });
  }

  editGenero(genero: Genero) {
    this.genero = { ...genero };
    this.generoDialog.set(true) ;
    this.editar.set(true)
  }

  deleteGenero(genero: Genero) {
    this.confirmationService.confirm({
      message: 'Estás seguro de eleminar ' + genero.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.generoService.deleteGenero(genero.id).subscribe(value => {
          if (value){
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Genero eleminado', life: 3000 });
            this.cargarDatos()
          }else{
            this.showError()
          }
        })
      }
    });
  }

  hideDialog() {
    this.generoDialog.set(false) ;
    this.submitted.set(false);
    this.editar.set(false);
  }

  saveGenero() {
    this.submitted.set(true);
    if (this.editar()){
      this.confirmationService.confirm({
        message: '¿Estás seguro de editar el genero seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.editar.set(false);
          this.generoService.updateGenero(this.genero).subscribe(value => {
            if (value){
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha realizado el cambio', life: 3000 });
              this.submitted.set(true);
              this.generoDialog.set(false) ;
              this.cargarDatos()
              this.submitted.set(false);
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
      this.generoService.addGenero(this.genero).subscribe(value => {
        if (value){
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha creado correctamente', life: 3000 });
          this.generoDialog.set(false);
          this.cargarDatos();
          this.submitted.set(false);
        }else{
          this.showError();
        }
      })
    }
  }

}
