package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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

    @Column(name = "titulo", nullable = false)
    @NotBlank(message = "Introduzca un título")
    private String titulo;

    @Column(name = "sinopsis", nullable = false)
    @NotBlank(message = "No se puede poner el sinopsis en blanco")
    private String sinopsis;

    @Column(name = "idioma", nullable = false)
    @NotBlank(message = "Introduzca un idioma")
    private String idioma;

    @Column(name = "portada", nullable = false)
    private String portada;

    @Column(name = "tipo", nullable = false)
    @NotBlank(message = "Elige un tipo")
    private String tipo;

    @Column(name = "ano_publicacion", nullable = false)
    @Positive
    private int anoPublicacion;

    @ManyToMany
    @JoinTable(
            name = "comic_genero",
            joinColumns = @JoinColumn(name = "id_comic", referencedColumnName = "id_comic"),
            inverseJoinColumns = @JoinColumn(name = "id_genero", referencedColumnName = "id_genero")
    )
    @NotEmpty(message = "Tienes que poner un genero")
    private Set<Genero> generos = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "comic_autor",
            joinColumns = @JoinColumn(name = "id_comic", referencedColumnName = "id_comic"),
            inverseJoinColumns = @JoinColumn(name = "id_autor", referencedColumnName = "id_autor")
    )
    @NotEmpty(message = "Tienes que poner un autor")
    private Set<Autor> autores = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_editorial", nullable = false, foreignKey = @ForeignKey(name = "FK_Libro_editorial"))
    @NotNull(message = "Tienes que poner un editorial")
    private Editorial editorial;

    @OneToMany(mappedBy = "comic", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<Resena> resenas = new ArrayList<>();

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