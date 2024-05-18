package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Entity
@Table(name = "pedido")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private long id;

    @Column(name="precio",nullable = false)
    private double precio;

    @Column(name="estado",nullable = false)
    private String estado;

    @Column(name="fecha",nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd-HH:mm:ss",  shape = JsonFormat.Shape.STRING)
    private Date fecha;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_vendedor", foreignKey = @ForeignKey(name = "FK_Pedido_Vendedor"))
    @JsonIgnore
    private Usuario vendedor;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_comprador", foreignKey = @ForeignKey(name = "FK_Pedido_Comprador"))
    @JsonIgnore
    private Usuario comprador;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_producto", foreignKey = @ForeignKey(name = "FK_Pedido_Producto"))
    @JsonIgnore
    private Producto producto;
}