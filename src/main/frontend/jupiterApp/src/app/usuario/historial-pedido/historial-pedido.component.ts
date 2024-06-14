import {Component, inject, OnInit, signal} from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {PedidoService} from "../../core/service/pedido.service";
import {EstadoPedido, Pedido} from "../../core/interface/pedido.interface";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {FormsModule} from "@angular/forms";
import {ImageModule} from "primeng/image";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {TriStateCheckboxModule} from "primeng/tristatecheckbox";
import {delay} from "rxjs";
import {DropdownModule} from "primeng/dropdown";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'user-historial-pedido',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    CurrencyPipe,
    DialogModule,
    FileUploadModule,
    FormsModule,
    ImageModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    NgForOf,
    NgIf,
    RippleModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    TriStateCheckboxModule,
    DropdownModule,
    TagModule
  ],
  templateUrl: './historial-pedido.component.html',
  styles: `a{
    text-decoration: none;
    color: var();
  }`
})
export class HistorialPedidoComponent implements OnInit {

  loading = signal(true);
  pedidos = signal<Pedido[]>([]);
  estados: EstadoPedido[] = [EstadoPedido.Pediente, EstadoPedido.Enviado, EstadoPedido.Entregado];
  pedido!: Pedido;
  submitted = signal(false);
  pedidoDialog: boolean = false;
  private authService = inject(AuthService);
  usuario = this.authService.user();
  private pedidoService = inject(PedidoService);

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) {

  }

  ngOnInit(): void {
    setTimeout(() => {

      this.cargarDatos();
    }, 500)
  }

  cargarDatos() {
    this.loading.set(true);

    this.pedidoService.getPedidoByUsuario(this.usuario).pipe(
      delay(500)
    ).subscribe(pedido => {
      this.pedidos.set(pedido);
      this.loading.set(false);
    })

  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Se ha ocurrido un error al hacer la operación'
    });
  }


  editPedido(pedido: Pedido) {
    this.pedido = {...pedido};
    this.pedidoDialog = true;
  }

  hideDialog() {
    this.pedidoDialog = false;
    this.submitted.set(false);
  }

  savePedido() {
    this.submitted.set(true);
    this.confirmationService.confirm({
      message: '¿Estás seguro de editar el pedido seleccionados?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pedidoService.updatePedido(this.pedido).subscribe(value => {
          if (value) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Se ha realizado el cambio',
              life: 3000
            });
            this.pedidoDialog = false;
            this.cargarDatos();
            this.submitted.set(false);
          } else {
            this.showError()
          }
        })

      }
    });
  }

}
