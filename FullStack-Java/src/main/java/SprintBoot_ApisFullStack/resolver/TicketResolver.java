package com.ejemplo.ticketapi.resolver;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.ejemplo.ticketapi.model.Ticket;
import com.ejemplo.ticketapi.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

@Component
public class TicketResolver implements GraphQLQueryResolver, GraphQLMutationResolver {

    @Autowired
    private TicketService ticketService;

    public Page<Ticket> tickets(int page, int size) {
        return ticketService.findAll(page, size);
    }

    public Ticket ticket(Long id) {
        return ticketService.findById(id).orElse(null);
    }

    public Ticket createTicket(String usuario, String estatus) {
        Ticket ticket = new Ticket();
        ticket.setUsuario(usuario);
        ticket.setEstatus(estatus);
        ticket.setFechaCreacion(LocalDateTime.now());
        ticket.setFechaActualizacion(LocalDateTime.now());
        return ticketService.save(ticket);
    }

    public Ticket updateTicket(Long id, String usuario, String estatus) {
        return ticketService.findById(id).map(ticket -> {
            ticket.setUsuario(usuario);
            ticket.setFechaActualizacion(LocalDateTime.now());
            ticket.setEstatus(estatus);
            return ticketService.save(ticket);
        }).orElse(null);
    }

    public Boolean deleteTicket(Long id) {
        return ticketService.findById(id).map(ticket -> {
            ticketService.deleteById(id);
            return true;
        }).orElse(false);
    }
}
