package org.jiada.jupiter.exception;

public class EntityNotFoundException extends RuntimeException {
    public EntityNotFoundException(Long id,Object object) {
        super("Not found "+object.getClass().getSimpleName().toLowerCase()+" with id: " + id);
    }
}
