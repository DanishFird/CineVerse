package com.cineverse.notification.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendBookingConfirmation(String toEmail, Long bookingId, String seats, double amount) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("CineVerse - Booking Confirmed! (#" + bookingId + ")");
            message.setText("Dear User,\n\n" +
                    "Your booking is confirmed.\n\n" +
                    "Booking ID: " + bookingId + "\n" +
                    "Seats: " + seats + "\n" +
                    "Total Amount: ₹" + amount + "\n\n" +
                    "Enjoy the movie!\nCineVerse Team");

            // Uncomment to actually send when valid SMTP details are provided
            // mailSender.send(message);
            log.info("Simulated email sent to {} for booking {}", toEmail, bookingId);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", toEmail, e.getMessage());
        }
    }
}
