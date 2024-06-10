package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
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

    @Column(name = "nombre", nullable = false)
    @NotBlank(message = "Introduzca un nombre al producto")
    private String nombre;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "precio", nullable = false)
    @PositiveOrZero(message = "El precio no puede ser negativo")
    private Double precio;

    @Column(name = "imagen", nullable = false)
    @NotBlank(message = "Introduzca un imagen al producto")
    private String imagen;

    @Column(name = "comprado", nullable = false)
    private boolean comprado;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario", foreignKey = @ForeignKey(name = "FK_Producto_Usuario"))
    @JsonIgnore
    private Usuario usuario;
}