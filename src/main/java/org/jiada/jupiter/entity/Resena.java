package org.jiada.jupiter.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;


@Entity
@Table(name = "resena")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@SequenceGenerator(
        name = "ResenaSeq",
        sequenceName = "resena_seq",
        allocationSize = 1
)
public class Resena {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ResenaSeq")
    @Column(name = "id_resena")
    private long id;

    @Column(name = "calificacion", nullable = false)
    @Min(value = 1, message = "Debe tener una calificación mínima de 1 estrella")
    @Max(value = 5, message = "Debe tener una calificación máxima de 5 estrellas")
    private int calificacion;

    @Column(name = "texto", nullable = false, length = 1000)
    @Length(max = 1000, message = "El texto debe tener menos que {max} caracteres")
    private String texto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_libro", foreignKey = @ForeignKey(name = "FK_Resena_Libro"))
    @JsonIgnore
    private Libro libro;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_comic", foreignKey = @ForeignKey(name = "FK_Resena_Comic"))
    @JsonIgnore
    private Comic comic;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario", foreignKey = @ForeignKey(name = "FK_Resena_Usuario"))
    private Usuario usuario;
}