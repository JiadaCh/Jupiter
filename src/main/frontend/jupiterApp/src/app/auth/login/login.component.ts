import {Component, inject, signal} from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {ChipsModule} from "primeng/chips";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {Router} from "@angular/router";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {MessageService} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {ImageModule} from "primeng/image";
import {NgForOf, NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {TagModule} from "primeng/tag";
import {Usuario} from "../../core/interface/usuario.interface";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    ChipsModule,
    ButtonModule,
    DividerModule,
    PasswordModule,
    FormsModule,
    FloatLabelModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    ImageModule,
    NgForOf,
    NgIf,
    RippleModule,
    TagModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  submitted = signal(false);
  opcion: string = "";
  contra: string = "";
  usuarioDialog: boolean = false;
  usuario!: Usuario;

  constructor(private messageService: MessageService) {
  }

  onNew() {
    this.usuario = {
      contrasena: "",
      correo: "",
      id: 0,
      imagen: "http://localhost:8080/media/default-perfil.webp",
      nombre: "",
      rol: "usuario"
    };
    this.submitted.set(false);
    this.usuarioDialog = true;
  }

  hideDialog() {
    this.submitted.set(false);
    this.usuarioDialog = false;
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Se ha ocurrido un error al hacer la operación'
    });
  }

  onLogin(): void {
    this.authService.login(this.opcion, this.contra)
      .subscribe(user => {
        if (user) {
          this.authService.saveToLocalStorage(user);
          this.router.navigate([`user/${user.id}/perfil`]).then(() => {
            window.location.reload();
          });
        }

        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Usuario/contraseña incorrecta'});
      })
  }

  onRegister() {
    this.submitted.set(true);
    this.authService.register(this.usuario).subscribe(value => {
      if (value) {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Se ha creado registrado correctamente el usuario',
          life: 3000
        });
        this.usuarioDialog = false;
        this.submitted.set(true);
      } else {
        this.showError();
      }
    })
  }
}
