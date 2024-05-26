package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@SequenceGenerator(
        name = "ComicSeq",
        sequenceName = "comic_seq",
        allocationSize = 1
)
public class Comic {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ComicSeq")
    @Column(name = "id_comic")
    private long id;

    @Column(name="titulo",nullable = false)
    private String titulo;

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

    @ManyToMany
    @JoinTable(
            name = "comic_genero",
            joinColumns = @JoinColumn(name = "id_comic", referencedColumnName = "id_comic"),
            inverseJoinColumns = @JoinColumn(name="id_genero", referencedColumnName = "id_genero")
    )
    private Set<Genero> generos = new HashSet<>();

    @ManyToMany
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
    @JsonIgnore
    private List<Resena> resenas = new ArrayList<>();


    public void addGenero(Genero genero) {
        generos.add(genero);
        genero.getComics().add(this);
    }

    public void removeGenero(Genero genero) {
        generos.remove(genero);
        genero.getComics().remove(this);
    }

    public void addAutor(Autor autor) {
        autores.add(autor);
        autor.getComics().add(this);
    }

    public void removeAutor(Autor autor) {
        autores.remove(autor);
        autor.getComics().remove(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Comic)) return false;
        return Objects.equals(id, ((Comic) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}