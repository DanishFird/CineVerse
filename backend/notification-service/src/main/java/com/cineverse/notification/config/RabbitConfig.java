package com.cineverse.notification.config;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String BOOKING_QUEUE = "bookingQueue";

    @Bean
    public org.springframework.amqp.core.Queue bookingQueue() {
        return new org.springframework.amqp.core.Queue(BOOKING_QUEUE, true);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
