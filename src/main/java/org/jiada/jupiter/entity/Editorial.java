package org.jiada.jupiter.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "editorial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Editorial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_editorial")
    private long id;

    @Column(name="nombre",nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "editorial", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Libro> libros = new HashSet<>();

    @OneToMany(mappedBy = "editorial", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Comic> comics = new HashSet<>();
}