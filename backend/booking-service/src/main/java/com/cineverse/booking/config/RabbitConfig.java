package com.cineverse.booking.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String BOOKING_QUEUE = "bookingQueue";
    public static final String BOOKING_DLQ = "bookingQueue.dlq";

    @Bean
    public Queue bookingQueue() {
        return QueueBuilder.durable(BOOKING_QUEUE)
                .withArgument("x-dead-letter-exchange", "")
                .withArgument("x-dead-letter-routing-key", BOOKING_DLQ)
                .build();
    }

    @Bean
    public Queue deadLetterQueue() {
        return new Queue(BOOKING_DLQ, true);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
