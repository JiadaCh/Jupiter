package org.jiada.jupiter.service;


import org.jiada.jupiter.entity.Usuario;
import org.jiada.jupiter.exception.EntityNotFoundException;
import org.jiada.jupiter.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> all() {
        return this.usuarioRepository.findAll();
    }

    public Usuario save(Usuario Usuario) {
        return this.usuarioRepository.save(Usuario);
    }

    public Usuario one(Long id) {
        return this.usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(id, new Usuario()));
    }

    public Usuario replace(Long id, Usuario usuario) {

        return this.usuarioRepository.findById(id).map( p -> (id.equals(usuario.getId())  ?
                                                            this.usuarioRepository.save(usuario) : null))
                .orElseThrow(() -> new EntityNotFoundException(id, new Usuario()));

    }

    public void delete(Long id) {
        this.usuarioRepository.findById(id).map(p -> {this.usuarioRepository.delete(p);
                                                        return p;})
                .orElseThrow(() -> new EntityNotFoundException(id, new Usuario()));
    }

    public Usuario login(String usuario, String contrasena) {
        Usuario user = this.usuarioRepository.findByNombreOrCorreo(usuario,usuario);

        System.out.println(usuario);
        if (user != null && user.getContrasena().equals(contrasena)) {
            System.out.println("Usuario encontrado");
            return user;

        }

            return null;

    }
}
