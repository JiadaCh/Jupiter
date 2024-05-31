import {Component, computed, inject, OnInit, signal} from '@angular/core';
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
import {AuthService} from "@service/auth.service";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {Usuario} from "@interface/usuario.interface";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";
import {UsuarioService} from "@service/usuario.service";
import {FileSelectEvent, FileUploadModule} from "primeng/fileupload";
import {MediaService} from "@service/media.service";
import {ToastModule} from "primeng/toast";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";

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
    NgForOf
  ],
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit{
  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);
  private mediaService = inject(MediaService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  usuarioLogeado = this.authService.user();
  usuario!:Usuario;
  editar = signal(false);
  submitted = signal(false);

  constructor(private messageService: MessageService) {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.usuarioService.getUsuarioById(id))
      )
      .subscribe((usuario) => {
        if (!usuario) return this.router.navigate(['/user']);
        this.usuario = usuario;
        return;
      });
  }
  ngOnInit(): void {


  }
  onUpload(event: FileSelectEvent) {

    const file = event.files[0];
    if (file){
      const formdata = new FormData();
      formdata.append('file', file);

      formdata.append('subfolder', "usuario");
      formdata.append('filename', "usuario-"+this.usuario!.nombre+"-"+this.usuario!.correo);
      this.mediaService.uploadFile(formdata).subscribe(res=>{
        this.usuario!.imagen = res.url;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha cambiado correctamente', life: 3000 });
      })
    }
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
  editUsuario(usuario: Usuario) {
    this.usuario = { ...usuario };
    this.editar.set(true)
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se ha ocurrido un error al hacer la operación' });
  }

  saveUsuario() {

      this.usuarioService.updateUsuario(this.usuario!).subscribe(value => {
        if (value){
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Se ha cambiado correctamente', life: 3000 });
          this.editar.set(false);
          this.submitted.set(true);

        }else{
          this.showError();
        }
      })
    }



}
