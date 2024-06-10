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

    @Column(name="calificacion",nullable = false)
    @Length(min = 1, max = 5, message = "Debe tener una calificación entre {min} y {max}")
    private double calificacion;

    @Column(name="texto",nullable = false)
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