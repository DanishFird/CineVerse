package com.cineverse.notification.listener;

import com.cineverse.notification.config.RabbitConfig;
import com.cineverse.notification.dto.BookingEvent;
import com.cineverse.notification.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class BookingEventListener {

    private static final Logger log = LoggerFactory.getLogger(BookingEventListener.class);
    private final EmailService emailService;

    public BookingEventListener(EmailService emailService) {
        this.emailService = emailService;
    }

    @RabbitListener(queues = RabbitConfig.BOOKING_QUEUE)
    public void handleBookingEvent(BookingEvent event) {
        log.info("Received booking event: ID={}, Status={}, Email={}",
                event.getBookingId(), event.getStatus(), event.getUserEmail());

        if ("CONFIRMED".equals(event.getStatus())) {
            String seatsStr = String.join(", ", event.getSeatNumbers());
            emailService.sendBookingConfirmation(
                    event.getUserEmail(),
                    event.getBookingId(),
                    seatsStr,
                    event.getTotalAmount()
            );
        }
    }
}
