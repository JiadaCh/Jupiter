package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


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
    @Email(message = "Formato de email incorrecto", regexp="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")
    private String correo;

    @Column(name="nombre",nullable = false, unique = true)
    @NotBlank(message = "no se puede poner el nombre en blanco")
    private String nombre;

    @Column(name="rol",nullable = false)
    private String rol;

    @Column(name="direccion")
    private String direccion;

    @Column(name="contrasena",nullable = false)
    @Size(min=4, message = "Contraseña de al menos de 4 caracteres.")
    @Size(max=20, message = "Contraseña como máximo de 20 caracteres.")
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

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        Usuario usuario = (Usuario) object;
        return Objects.equals(correo, usuario.correo) && Objects.equals(nombre, usuario.nombre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(correo, nombre);
    }
}