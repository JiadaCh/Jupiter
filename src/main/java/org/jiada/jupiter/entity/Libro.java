package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.*;


@Entity
@Table(name = "libro")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SequenceGenerator(
        name = "LibroSeq",
        sequenceName = "libro_seq",
        allocationSize = 1
)
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LibroSeq")
    @Column(name = "id_libro")
    private long id;

    @Column(name = "titulo", nullable = false)
    @NotBlank(message = "Introduzca un título")
    private String titulo;

    @Column(name = "ISBN", unique = true)
    private String ISBN;

    @Column(name = "sinopsis", nullable = false)
    @NotBlank(message = "No se puede poner el sinopsis en blanco")
    private String sinopsis;

    @Column(name = "idioma", nullable = false)
    @NotBlank(message = "Introduzca un idioma")
    private String idioma;

    @Column(name = "portada", nullable = false)
    private String portada;

    @Column(name = "num_pag", nullable = false)
    @Min(value = 10, message = "Introduzca el número de página. Mínimo de {min} páginas")
    @Positive
    private int numPag;

    @Column(name = "ano_publicacion", nullable = false)
    @Positive
    private int anoPublicacion;

    @ManyToMany
    @JoinTable(
            name = "libro_genero",
            joinColumns = @JoinColumn(name = "id_libro", referencedColumnName = "id_libro"),
            inverseJoinColumns = @JoinColumn(name = "id_genero", referencedColumnName = "id_genero")
    )
    @NotEmpty(message = "Tienes que poner un genero")
    private Set<Genero> generos = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "libro_autor",
            joinColumns = @JoinColumn(name = "id_libro", referencedColumnName = "id_libro"),
            inverseJoinColumns = @JoinColumn(name = "id_autor", referencedColumnName = "id_autor")
    )
    @NotEmpty(message = "Tienes que poner un autor")
    private Set<Autor> autores = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_editorial", nullable = false, foreignKey = @ForeignKey(name = "FK_Comic_editorial"))
    @NotNull(message = "Tienes que poner un editorial")
    private Editorial editorial;

    @OneToMany(mappedBy = "libro", fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private List<Resena> resenas = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Libro)) return false;
        return Objects.equals(id, ((Libro) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}