import {Component, inject, OnInit, signal} from '@angular/core';
import {SplitterModule} from "primeng/splitter";
import {AccordionModule} from "primeng/accordion";
import {FieldsetModule} from "primeng/fieldset";
import {ImageModule} from "primeng/image";
import {LoadingComponent} from "@shared/components/loading/loading.component";
import {NgForOf, NgIf} from "@angular/common";
import {PanelModule} from "primeng/panel";
import {RatingModule} from "primeng/rating";
import {TagAutorComponent} from "@shared/components/tag-autor/tag-autor.component";
import {TagGeneroComponent} from "@shared/components/tag-genero/tag-genero.component";
import {TagModule} from "primeng/tag";
import {AuthService} from "../../core/service/auth.service";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {Usuario} from "../../core/interface/usuario.interface";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";
import {UsuarioService} from "../../core/service/usuario.service";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {MediaService} from "../../core/service/media.service";
import {ToastModule} from "primeng/toast";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {AvatarModule} from "primeng/avatar";

@Component({
  selector: 'user-perfil',
  standalone: true,
  imports: [
    SplitterModule,
    AccordionModule,
    FieldsetModule,
    ImageModule,
    LoadingComponent,
    NgIf,
    PanelModule,
    RatingModule,
    TagAutorComponent,
    TagGeneroComponent,
    TagModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    FileUploadModule,
    NgForOf,
    AvatarModule
  ],
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {
  usuario!: Usuario;
  editar = signal(false);
  submitted = signal(false);
  private usuarioService = inject(UsuarioService);
  private mediaService = inject(MediaService);
  private authService = inject(AuthService);
  usuarioLogeado = this.authService.user();
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.usuarioService.getUsuarioById(id))
      )
      .subscribe((usuario) => {
        if (!usuario) return this.router.navigate(['/user']);
        this.usuario = usuario;
        return;
      });
  }

  onUpload(event: FileSelectEvent) {
    const file = event.files[0];
    if (file) {
      const formdata = new FormData();
      formdata.append('file', file);
      formdata.append('subfolder', "usuario");
      formdata.append('filename', "usuario-" + this.usuario!.id);
      this.mediaService.uploadFile(formdata).subscribe(res => {
        this.usuario!.imagen = res.url;
        this.messageService.add({
          severity: 'info',
          summary: 'Se ha cambiado el perfil',
          detail: 'Por favor, pulse save y refresca la pagina para ver el cambio'
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

  saveUsuario() {

    this.usuarioService.updateUsuario(this.usuario!).subscribe(value => {
      if (value) {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Se ha cambiado correctamente',
          life: 3000
        });
        this.editar.set(false);
        this.submitted.set(true);
      } else {
        this.showError();
      }
    })
  }


}
