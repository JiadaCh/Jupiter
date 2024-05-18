package org.jiada.jupiter.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "libro")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_libro")
    private long id;

    @Column(name="titulo",nullable = false)
    private double titulo;

    @Column(name="ISBN",unique = true)
    private String ISBN;

    @Column(name="sinopsis",nullable = false)
    private String sinopsis;

    @Column(name="idioma",nullable = false)
    private String idioma;

    @Column(name="portada",nullable = false)
    private String portada;

    @Column(name="num_pag",nullable = false)
    private int numPag;

    @Column(name="ano_publicacion",nullable = false)
    private int anoPublicacion;

    @ManyToMany
    @JoinTable(
            name = "libro_genero",
            joinColumns = @JoinColumn(name = "id_libro", referencedColumnName = "id_libro"),
            inverseJoinColumns = @JoinColumn(name="id_genero", referencedColumnName = "id_genero")
    )
    private Set<Genero> generos = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "libro_autor",
            joinColumns = @JoinColumn(name = "id_libro", referencedColumnName = "id_libro"),
            inverseJoinColumns = @JoinColumn(name="id_autor", referencedColumnName = "id_autor")
    )
    private Set<Autor> autores = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_editorial", nullable = false, foreignKey = @ForeignKey(name = "FK_Comic_editorial"))
    private Editorial editorial;

    @OneToMany(mappedBy = "libro", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Resena> resenas = new ArrayList<>();
}