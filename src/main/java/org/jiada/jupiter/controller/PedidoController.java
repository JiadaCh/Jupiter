package org.jiada.jupiter.controller;

import lombok.extern.slf4j.Slf4j;
import org.jiada.jupiter.entity.Pedido;
import org.jiada.jupiter.service.PedidoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/pedidos")
public class PedidoController {
    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping({"","/"})
    public List<Pedido> all() {
        log.info("Accediendo a todas los pedidos");
        return this.pedidoService.all();
    }

    @PostMapping({"","/"})
    public Pedido newPedido(@RequestBody Pedido pedido) {
        return this.pedidoService.save(pedido);
    }

    @GetMapping("/{id}")
    public Pedido one(@PathVariable("id") Long id) {
        return this.pedidoService.one(id);
    }

    @GetMapping("/usuario")
    public List<Pedido> findByUsuario(@RequestParam("idUsuario") Long idUsuario) {
        return this.pedidoService.findByUsuario(idUsuario);
    }


    @PutMapping("/{id}")
    public Pedido replacePedido(@PathVariable("id") Long id, @RequestBody Pedido pedido) {
        return this.pedidoService.replace(id, pedido);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deletePedido(@PathVariable("id") Long id) {
        this.pedidoService.delete(id);
    }


}
