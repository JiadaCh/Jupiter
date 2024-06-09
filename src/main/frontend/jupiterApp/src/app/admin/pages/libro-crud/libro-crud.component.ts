import {Component, inject, OnInit, signal} from "@angular/core";
import {MediaService} from "@service/media.service";
import {Autor} from "@interface/autor.interface";
import {Column} from "@interface/column.interface";
import {ConfirmationService, MessageService} from "primeng/api";
import {delay} from "rxjs";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {ImageModule} from "primeng/image";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {GeneroService} from "@service/genero.service";
import {LibroService} from "@service/libro.service";
import {EditorialService} from "@service/editorial.service";
import {AutorService} from "@service/autor.service";
import {Libro} from "@interface/libros.interface";
import {Editorial} from "@interface/editorial.interface";
import {Genero} from "@interface/genero.interface";
import {TagAutorComponent} from "@shared/components/tag-autor/tag-autor.component";
import {TagGeneroComponent} from "@shared/components/tag-genero/tag-genero.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputMaskModule} from "primeng/inputmask";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-libro-crud',
  standalone: true,
  imports: [
    TableModule,
    MultiSelectModule,
    FormsModule,
    ToolbarModule,
    ToastModule,
    CommonModule,
    ImageModule,
    TagAutorComponent,
    TagGeneroComponent,
    ButtonModule,
    RippleModule,
    DropdownModule,
    DialogModule,
    TagModule,
    InputTextModule,
    FileUploadModule,
    InputTextareaModule,
    InputMaskModule,
    ConfirmDialogModule
  ],
  templateUrl: './libro-crud.component.html',
  styleUrl: './libro-crud.component.css',
})
export class LibroCrudComponent implements OnInit{
  private libroService = inject(LibroService);
  private editorialService = inject(EditorialService);
  private autorService = inject(AutorService);
  private mediaService = inject(MediaService);
  private generoService = inject(GeneroService);

  loading= signal(true);
  libros = signal<Libro[]>([]);
  editorial:Editorial[] = [];
  generos:Genero[] = [];
  autores:Autor[] = [];

  selectedLibros:Libro[] = [];


  cols: Column[] = [];

  selectedColumns: Column[] = [];

  uploadedFiles: any[] = [];
  libro!: Libro;

  editar = signal(false);
  submitted = signal(false);
  libroDialog = signal(false);

  constructor(private messageService: MessageService,private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.cargarDatos();

    this.editorialService.getEditorial().subscribe(res=> this.editorial = res);
    this.generoService.getGenero().subscribe(res=> this.generos = res);
    this.autorService.getAutor().subscribe(res=> this.autores = res);

    this.cols = [
      { field: 'idioma', header: 'Idioma' },
      { field: 'sinopsis', header: 'Sinopsis' },
      { field: 'editorial.nombre', header: 'Editorial' },
      { field: 'anoPublicacion', header: 'Año Publicación' },
      { field: 'isbn', header: 'ISBN' },
      { field: 'numPag', header: 'Número de página' },
      { field: 'generos.nombre', header: 'Géneros' },
      { field: 'autores.nombre', header: 'Autor' }
    ];

    this.selectedColumns = [this.cols[0]];
  }

  cargarDatos(){
    this.loading.set(true);

    this.libroService.getLibro().pipe(
      delay(500)
    ).subscribe( libro =>{
      this.libros.set(libro)
      this.loading.set(false);
    } )

  }

  onUpload(event: FileSelectEvent) {

    const file = event.files[0];
    if (file){
      const formdata = new FormData();
      formdata.append('file', file);

      formdata.append('subfolder', "libro");
      formdata.append('filename', "libro-"+this.libro.titulo+"-"+this.libro.anoPublicacion+"-"+this.libro.numPag);
      this.mediaService.uploadFile(formdata).subscribe(res=>{
        this.libro.portada = res.url;
      })
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se ha ocurrido un error al hacer la operación' });
  }

  openNew() {
    this.libro = {
      editorial: {
        id: 0,
        nombre: ""
      },
      anoPublicacion: 0, autores: [], generos: [], id: 0, idioma: "", numPag: 0, sinopsis: "", titulo: "",
      portada:"http://localhost:8080/media/libro/default-image.png"
    };
    this.submitted.set(false);
    this.libroDialog.set(true) ;
  }

  deleteSelectedLibros() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eleminar los libros seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let libro of this.selectedLibros){
          this.libroService.deleteLibro(libro.id).subscribe(value => {
            if (!value)
              this.showError()
            this.cargarDatos();
          })
        }
        this.selectedLibros = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Libroes Eliminados', life: 3000 });
      }
    });
  }

  editLibro(libro: Libro) {
    this.libro = { ...libro };
    this.libroDialog.set(true) ;
    this.editar.set(true)

  }

  deleteLibro(libro: Libro) {
    this.confirmationService.confirm({
      message: 'Estás seguro de eleminar ' + libro.titulo + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.libroService.deleteLibro(libro.id).subscribe(value => {
          if (value){
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Libro eleminado', life: 3000 });
            this.cargarDatos()
          }else{
            this.showError()
          }
        })
      }
    });
  }

  hideDialog() {
    this.libroDialog.set(false) ;
    this.submitted.set(false);
    this.editar.set(false);
  }

  saveLibro() {
    this.submitted.set(true);
    if (this.editar()){
      this.confirmationService.confirm({
        message: '¿Estás seguro de editar el libro seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.libroService.updateLibro(this.libro).subscribe(value => {
            if (value){
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha realizado el cambio', life: 3000 });
              this.libroDialog.set(false) ;
              this.editar.set(false);
              this.cargarDatos()
              this.submitted.set(false);
            }else{
              this.showError()
            }
          })

        }
      });
    }else{

      this.libroService.addLibro(this.libro).subscribe(value => {
        if (value){
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha creado correctamente', life: 3000 });
          this.libroDialog.set(false);
          this.cargarDatos();
          this.submitted.set(false);

        }else{
          this.showError();
        }
      })
    }
  }

}
