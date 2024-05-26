package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@SequenceGenerator(
        name = "EditorialSeq",
        sequenceName = "editorial_seq",
        allocationSize = 1
)
public class Editorial {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "editorial_seq")
    @Column(name = "id_editorial")
    private long id;

    @Column(name="nombre",nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "editorial")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Set<Libro> libros = new HashSet<>();

    @OneToMany(mappedBy = "editorial")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Set<Comic> comics = new HashSet<>();
}