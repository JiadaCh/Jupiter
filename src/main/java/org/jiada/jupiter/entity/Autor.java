package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "autor")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Autor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_autor")
    private long id;

    @Column(name="nombre",nullable = false)
    private String nombre;

    @Column(name="apellido1",nullable = false)
    private String apellido1;

    @Column(name="apellido2")
    private String apellido2;

    @ManyToMany(mappedBy = "autores", fetch = FetchType.LAZY)
    private Set<Libro> libros = new HashSet<>();

    @ManyToMany(mappedBy = "autores", fetch = FetchType.LAZY)
    private Set<Comic> comics = new HashSet<>();
}