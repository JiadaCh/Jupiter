package org.jiada.jupiter.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "genero")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Genero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_genero")
    private long id;

    @Column(name="nombre",nullable = false)
    private String nombre;

    @ManyToMany(mappedBy = "generos", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Libro> libros = new HashSet<>();

    @ManyToMany(mappedBy = "generos", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Comic> comics = new HashSet<>();
}