package com.ejemplo.ticketapi.controller;

import com.ejemplo.ticketapi.model.Ticket;
import com.ejemplo.ticketapi.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping
    public Page<Ticket> getAllTickets(@RequestParam int page, @RequestParam int size) {
        return ticketService.findAll(page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        return ticketService.findById(id)
                .map(ticket -> ResponseEntity.ok().body(ticket))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.save(ticket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket ticketDetails) {
        return ticketService.findById(id).map(ticket -> {
            ticket.setUsuario(ticketDetails.getUsuario());
            ticket.setFechaActualizacion(ticketDetails.getFechaActualizacion());
            ticket.setEstatus(ticketDetails.getEstatus());
            Ticket updatedTicket = ticketService.save(ticket);
            return ResponseEntity.ok().body(updatedTicket);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        return ticketService.findById(id).map(ticket -> {
            ticketService.deleteById(id);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
