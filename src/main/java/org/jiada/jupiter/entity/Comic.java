package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.*;


@Entity
@Table(name = "comic")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_comic")
    private long id;

    @Column(name="titulo",nullable = false)
    private double titulo;

    @Column(name="sinopsis",nullable = false)
    private String sinopsis;

    @Column(name="idioma",nullable = false)
    private String idioma;

    @Column(name="portada",nullable = false)
    private String portada;

    @Column(name="tipo",nullable = false)
    private String tipo;

    @Column(name="ano_publicacion",nullable = false)
    private int anoPublicacion;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "comic_genero",
            joinColumns = @JoinColumn(name = "id_comic", referencedColumnName = "id_comic"),
            inverseJoinColumns = @JoinColumn(name="id_genero", referencedColumnName = "id_genero")
    )
    private Set<Genero> generos = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "comic_autor",
            joinColumns = @JoinColumn(name = "id_comic", referencedColumnName = "id_comic"),
            inverseJoinColumns = @JoinColumn(name="id_autor", referencedColumnName = "id_autor")
    )
    private Set<Autor> autores = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_editorial", nullable = false, foreignKey = @ForeignKey(name = "FK_Libro_editorial"))
    private Editorial editorial;

    @OneToMany(mappedBy = "comic", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Resena> resenas = new ArrayList<>();

}