import {Component, inject, OnInit, signal} from '@angular/core';
import {LibroService} from "../../core/service/libro.service";
import {ActivatedRoute, Router} from "@angular/router";
import {delay, switchMap} from "rxjs";
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
import {Libro} from "../../core/interface/libros.interface";

@Component({
  selector: 'app-detalle-libro',
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
  templateUrl: './detalle-libro.component.html',
  styles: ``
})
export class DetalleLibroComponent implements OnInit {
  private libroService = inject(LibroService);
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  usuarioLogeado = this.authService.user();
  private resenaService = inject(ResenaService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  libro: Libro | undefined;
  calificacion: number = 0;
  mediaCalificacion: number = 0;
  resenas: Resena[] = [];
  resena: Resena | undefined;
  editar = signal(false);
  submitted = signal(false);
  resenaDialog: boolean = false;
  userCalf = signal(0);

  constructor(private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(2500),
        switchMap(({id}) => this.libroService.getLibroById(id))
      )
      .subscribe((libro) => {
        if (!libro) return this.router.navigate(['/libros']);
        this.resenaService.getResenaLibro(libro).subscribe((res) => {
          this.resenas = res;
          for (let resena of res) {
            this.calificacion += resena.calificacion;
          }
          this.getCalificacion();
        })
        if (this.usuarioLogeado) {
          this.resenaService.getResenaLibroUsuario(libro, this.usuarioLogeado).subscribe((res) => {
            this.resena = res;
          })
        }
        this.libro = libro;
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
    if (this.usuarioLogeado) {
      this.resena = {
        calificacion: 0, id: 0, texto: "", usuario: this.usuarioLogeado
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
    this.userCalf.set(this.resena!.calificacion)
  }

  deleteResena(resena: Resena) {
    this.confirmationService.confirm({
      message: 'Estás seguro de eleminar la reseña?',
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
  }

  saveResena() {
    this.submitted.set(true);
    if (this.editar()) {
      this.confirmationService.confirm({
        message: '¿Estás seguro de editar el reseña seleccionados?',
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

      this.resenaService.addResena(this.resena!, 0, this.libro!.id).subscribe(value => {
        if (value) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Se ha creado correctamente',
            life: 3000
          });
          this.resenaDialog = false;
          this.submitted.set(false);
          this.resenaService.getResenaLibroUsuario(this.libro!, this.usuarioLogeado!).subscribe((res) => {
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
