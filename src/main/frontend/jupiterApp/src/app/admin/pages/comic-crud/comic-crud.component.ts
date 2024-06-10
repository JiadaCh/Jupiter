import {Component, inject, OnInit, signal} from '@angular/core';
import {TableModule} from "primeng/table";
import {ComicService} from "../../../core/service/comic.service";
import {Comic, TipoComic} from "../../../core/interface/comic.interface";
import {Column} from "../../../core/interface/column.interface";
import {CommonModule} from "@angular/common";
import {MultiSelectModule} from "primeng/multiselect";
import {TagModule} from "primeng/tag";
import {InputTextModule} from "primeng/inputtext";
import {delay} from "rxjs";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToolbarModule} from "primeng/toolbar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ImageModule} from "primeng/image";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {MediaService} from "../../../core/service/media.service";
import {Editorial} from "../../../core/interface/editorial.interface";
import {EditorialService} from "../../../core/service/editorial.service";
import {GeneroService} from "../../../core/service/genero.service";
import {Genero} from "../../../core/interface/genero.interface";
import {TagGeneroComponent} from "@shared/components/tag-genero/tag-genero.component";
import {InputMaskModule} from "primeng/inputmask";
import {TagAutorComponent} from "@shared/components/tag-autor/tag-autor.component";
import {AutorService} from "../../../core/service/autor.service";
import {Autor} from "../../../core/interface/autor.interface";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-comic-crud',
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
  templateUrl: './comic-crud.component.html',
  styleUrl: './comic-crud.component.css',
})
export class ComicCrudComponent implements OnInit {
  loading = signal(true);
  comics = signal<Comic[]>([]);
  editorial: Editorial[] = [];
  generos: Genero[] = [];
  autores: Autor[] = [];
  selectedComics: Comic[] = [];
  cols: Column[] = [];
  selectedColumns: Column[] = [];
  tipoComics: any[] = [];
  uploadedFiles: any[] = [];
  comic!: Comic;
  editar = signal(false);
  submitted = signal(false);
  comicDialog: boolean = false;
  private comicService = inject(ComicService);
  private editorialService = inject(EditorialService);
  private autorService = inject(AutorService);
  private mediaService = inject(MediaService);
  private generoService = inject(GeneroService);

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.cargarDatos();

    this.editorialService.getEditorial().subscribe(res => this.editorial = res);
    this.generoService.getGenero().subscribe(res => this.generos = res);
    this.autorService.getAutor().subscribe(res => this.autores = res);

    this.cols = [
      {field: 'idioma', header: 'Idioma'},
      {field: 'sinopsis', header: 'Sinopsis'},
      {field: 'editorial.nombre', header: 'Editorial'},
      {field: 'anoPublicacion', header: 'Año Publicación'},
      {field: 'generos.nombre', header: 'Géneros'},
      {field: 'autores.nombre', header: 'Autor'}
    ];

    this.selectedColumns = [this.cols[0]];

    this.tipoComics = [
      {label: 'Manga', value: 'Manga'},
      {label: 'Americano', value: 'Cómics Americano'},
      {label: 'Manhwa', value: 'Manhwa'},
      {label: 'Manhua', value: 'Manhua'},
      {label: 'Otros', value: 'Otros'}
    ]
  }


  cargarDatos() {
    this.loading.set(true);

    this.comicService.getComic().pipe(
      delay(500)
    ).subscribe(comic => {
      this.comics.set(comic)
      this.loading.set(false);
    })

  }

  onUpload(event: FileSelectEvent) {

    const file = event.files[0];
    if (file) {
      const formdata = new FormData();
      formdata.append('file', file);

      formdata.append('subfolder', "comic");
      formdata.append('filename', "comic-" + this.comic.titulo + "-" + this.comic.tipo + "-" + this.comic.anoPublicacion);
      this.mediaService.uploadFile(formdata).subscribe(res => {
        this.comic.portada = res.url;
        this.messageService.add({
          severity: 'info',
          summary: 'Cambio realizado con éxito',
          detail: 'Refresca la pagina para ver el cambio'
        });
      })
    }
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Se ha ocurrido un error al hacer la operación'
    });
  }

  openNew() {
    this.comic = {
      tipo: TipoComic.Americano,
      autores: [], generos: [],
      portada: "http://localhost:8080/media/comic/default-image.png", editorial: {
        id: 0,
        nombre: ''
      }, anoPublicacion: 0, id: 0, idioma: "", sinopsis: "", titulo: ""
    };
    this.submitted.set(false);
    this.comicDialog = true;
  }

  deleteSelectedComics() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eleminar los comics seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let comic of this.selectedComics) {
          this.comicService.deleteComic(comic.id).subscribe(value => {
            if (!value)
              this.showError()
            this.cargarDatos();
          })
        }
        this.selectedComics = [];
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Comices Eliminados', life: 3000});
      }
    });
  }

  editComic(comic: Comic) {
    this.comic = {...comic};
    this.comicDialog = true;
    this.editar.set(true)
  }

  deleteComic(comic: Comic) {
    this.confirmationService.confirm({
      message: 'Estás seguro de eleminar ' + comic.titulo + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.comicService.deleteComic(comic.id).subscribe(value => {
          if (value) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Comic eleminado',
              life: 3000
            });
            this.cargarDatos()
          } else {
            this.showError()
          }
        })
      }
    });
  }

  hideDialog() {
    this.comicDialog = false;
    this.submitted.set(false);
    this.editar.set(false);
  }

  saveComic() {
    this.submitted.set(true);
    if (this.editar()) {
      this.confirmationService.confirm({
        message: '¿Estás seguro de editar el comic seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.comicService.updateComic(this.comic).subscribe(value => {
            if (value) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Se ha realizado el cambio',
                life: 3000
              });
              this.comicDialog = false;
              this.submitted.set(false);
              this.editar.set(false);
              this.cargarDatos()
            } else {
              this.showError()
            }
          })

        }
      });
    } else {

      this.comicService.addComic(this.comic).subscribe(value => {
        if (value) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Se ha creado correctamente',
            life: 3000
          });
          this.submitted.set(false);
          this.comicDialog = false;
          this.cargarDatos();

        } else {
          this.showError();
        }
      })
    }
  }

}
