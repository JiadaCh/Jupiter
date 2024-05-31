package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "producto")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SequenceGenerator(
        name = "ProductoSeq",
        sequenceName = "producto_seq",
        allocationSize = 1
)
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ProductoSeq")
    @Column(name = "id_producto")
    private long id;

    @Column(name="nombre",nullable = false)
    private String nombre;

    @Column(name="descripcion",nullable = false)
    private String descripcion;

    @Column(name="precio",nullable = false)
    private Double precio;

    @Column(name="imagen",nullable = false)
    private String imagen;

    @Column(name="comprado", nullable = false)
    private boolean comprado;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario", foreignKey = @ForeignKey(name = "FK_Producto_Usuario"))
    @JsonIgnore
    private Usuario usuario;
}