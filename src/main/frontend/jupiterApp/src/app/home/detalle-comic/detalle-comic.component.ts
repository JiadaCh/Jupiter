import {Component, inject, OnInit, signal} from '@angular/core';
import {ComicService} from "../../core/service/comic.service";
import {ActivatedRoute, Router} from "@angular/router";
import {delay, switchMap} from "rxjs";
import {Comic} from "../../core/interface/comic.interface";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoadingComponent} from "@shared/components/loading/loading.component";
import {PanelModule} from "primeng/panel";
import {SplitterModule} from "primeng/splitter";
import {ImageModule} from "primeng/image";
import {TagAutorComponent} from "@shared/components/tag-autor/tag-autor.component";
import {TagModule} from "primeng/tag";
import {FieldsetModule} from "primeng/fieldset";
import {TagGeneroComponent} from "@shared/components/tag-genero/tag-genero.component";
import {AccordionModule} from "primeng/accordion";
import {CommonModule} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {AvatarModule} from "primeng/avatar";
import {AuthService} from "../../core/service/auth.service";
import {ResenaService} from "../../core/service/resena.service";
import {Resena} from "../../core/interface/resena.interface";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-detalle-comic',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    LoadingComponent,
    PanelModule,
    SplitterModule,
    ImageModule,
    TagAutorComponent,
    TagModule,
    FieldsetModule,
    TagGeneroComponent,
    AccordionModule,
    CommonModule,
    RatingModule,
    FormsModule,
    AvatarModule,
    DividerModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    FileUploadModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './detalle-comic.component.html',
  styles: ``
})
export class DetalleComicComponent implements OnInit {
  private resenaService = inject(ResenaService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private comicService = inject(ComicService);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private userCalf = signal(0);
  comic: Comic | undefined;
  calificacion: number = 0;
  mediaCalificacion: number = 0;
  resenas: Resena[] = [];
  resena: Resena | undefined;
  editar = signal(false);
  submitted = signal(false);
  resenaDialog: boolean = false;
  usuarioLoageado = this.authService.user();

  constructor(private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(2500),
        switchMap(({id}) => this.comicService.getComicById(id))
      )
      .subscribe((comic) => {
        if (!comic) return this.router.navigate(['/comics']);
        this.resenaService.getResenaComic(comic).subscribe((res) => {
          this.resenas = res;
          for (let resena of res) {
            this.calificacion += resena.calificacion;
          }
          this.getCalificacion();
        })
        if (this.usuarioLoageado) {
          this.resenaService.getResenaComicUsuario(comic, this.usuarioLoageado).subscribe((res) => {
            this.resena = res;
          })
        }
        this.comic = comic;
        return;
      });
  }


  getCalificacion() {
    this.mediaCalificacion = this.calificacion / this.resenas.length;
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Se ha ocurrido un error al hacer la operación'
    });
  }

  openNew() {
    if (this.usuarioLoageado) {
      this.resena = {
        calificacion: 0, id: 0, texto: "", usuario: this.usuarioLoageado
      };
      this.submitted.set(false);
      this.resenaDialog = true;
    } else {
      this.router.navigate(['/login']).then();
    }
  }

  editResena() {
    this.resenaDialog = true;
    this.editar.set(true)
  }

  deleteResena(resena: Resena) {
    this.confirmationService.confirm({
      message: 'Estás seguro de eleminar la resena?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.resenaService.deleteResena(resena.id).subscribe(value => {
          if (value) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Resena eleminado',
              life: 3000
            });
            this.resena = undefined;
            this.calificacion -= resena.calificacion;
            this.getCalificacion();
          } else {
            this.showError()
          }
        })
      }
    });
  }

  hideDialog() {
    this.resenaDialog = false;
    this.submitted.set(false);
    this.editar.set(false);
    this.userCalf.set(this.resena!.calificacion)
  }

  saveResena() {
    this.submitted.set(true);

    if (this.editar()) {
      this.confirmationService.confirm({
        message: '¿Estás seguro de editar el resena seleccionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.resenaService.updateResena(this.resena!).subscribe(value => {
            if (value) {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Se ha realizado el cambio',
                life: 3000
              });
              this.resenaDialog = false;
              this.editar.set(false);
              this.submitted.set(false);
              let calf = this.resena!.calificacion;
              this.calificacion -= this.userCalf() - calf;
              this.getCalificacion();
            } else {
              this.showError()
            }
          })

        }
      });
    } else {

      this.resenaService.addResena(this.resena!, this.comic!.id, 0).subscribe(value => {
        if (value) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Se ha creado correctamente',
            life: 3000
          });
          this.resenaDialog = false;
          this.submitted.set(false);
          this.resenaService.getResenaComicUsuario(this.comic!, this.usuarioLoageado!).subscribe((res) => {
            this.resena = res;
            this.resenas.push(res);
            this.calificacion += res.calificacion;
            this.getCalificacion();
          })
        } else {
          this.showError();
        }
      })
    }
  }


}
