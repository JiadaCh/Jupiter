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
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private long id;

    @Column(name="descripcion",nullable = false)
    private String descripcion;

    @Column(name="precio",nullable = false)
    private Double precio;

    @Column(name="imagen",nullable = false)
    private String imagen;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario", foreignKey = @ForeignKey(name = "FK_Producto_Usuario"))
    @JsonIgnore
    private Usuario usuario;
}