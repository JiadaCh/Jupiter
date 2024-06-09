package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "autor")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SequenceGenerator(
        name = "AutorSeq",
        sequenceName = "autor_seq",
        allocationSize = 1
)
public class Autor{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AutorSeq")
    @Column(name = "id_autor")
    private long id;

    @Column(name="nombre",nullable = false)
    @NotBlank(message = "no se puede poner el nombre en blanco")
    private String nombre;

    @Column(name="apellido1",nullable = false)
    @NotBlank(message = "no se puede poner el apellido en blanco")
    private String apellido1;

    @Column(name="apellido2")
    private String apellido2;

    @ManyToMany(mappedBy = "autores")
    @JsonIgnore
    private Set<Libro> libros = new HashSet<>();

    @ManyToMany(mappedBy = "autores")
    @JsonIgnore
    private Set<Comic> comics = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Autor)) return false;
        return Objects.equals(id, ((Autor) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}