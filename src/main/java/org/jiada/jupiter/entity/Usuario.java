package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "usuario")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SequenceGenerator(
        name = "UsuarioSeq",
        sequenceName = "usuario_seq",
        allocationSize = 1
)
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "UsuarioSeq")
    @Column(name = "id_usuario")
    private long id;

    @Column(name="correo",nullable = false,unique = true)
    private String correo;

    @Column(name="nombre",nullable = false, unique = true)
    private String nombre;

    @Column(name="rol",nullable = false)
    private String rol;

    @Column(name="direccion")
    private String direccion;

    @Column(name="contrasena",nullable = false)
    private String contrasena;

    @Column(name="imagen",nullable = false)
    private String imagen;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<Resena> resenas = new ArrayList<>();

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<Producto> productos = new ArrayList<>();

    @OneToMany(mappedBy = "vendedor", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<Pedido> pedidosVendido = new ArrayList<>();

    @OneToMany(mappedBy = "comprador", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<Pedido> pedidosComprado = new ArrayList<>();
}