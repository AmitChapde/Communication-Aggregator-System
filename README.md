# Communication Aggregator System — README

A simplified **Communication Aggregator** built using **Node.js microservices + RabbitMQ**.  
The system receives messages from clients, validates & routes them, and simulates delivery while producing full observability logs.

---

#  1. High-Level Design (HLD)

## Architectural Diagram

        ┌────────────────────────┐
        │  Client (Postman/UI)   │
        └────────────┬───────────┘
                     POST /send
                          │
                          ▼
          ┌────────────────────────────┐
          │     Task Router Service     │
          │  (Receives + Validates +    │
          │   Routes Messages)          │
          └──────┬──────────┬──────────┘
                 │RabbitMQ Queues
 ┌────────────────┼────────────────┐
 │                │                │
 ▼                ▼                ▼
┌────────┐ ┌──────────┐ ┌───────────┐
│ email │ │ sms │ │ whatsapp │
│ queue │ │ queue │ │ queue │
└───┬────┘ └────┬──────┘ └────┬──────┘
│ RabbitMQ Consumers │ │
▼ ▼ ▼
┌──────────────────────────────────────────────┐
│ Delivery Service │
│ (Simulates sending Email/SMS/WhatsApp) │
└───────┬──────────────────────────────────────┘
│Log Events
▼
┌───────────────────────────────┐
│ Logging Service │
│ Stores logs → Elasticsearch │
└───────────────────────────────┘


---

##  Data Flow (Step-by-step)

1. Client sends request → `POST /send`
2. **Task Router Service**  
   - validates payload  
   - assigns UUID  
   - chooses routing queue  
   - logs the request  
   - publishes to RabbitMQ
3. **Delivery Service**  
   - consumes messages  
   - simulates delivery  
   - logs success
4. **Logging Service**  
   - receives logs  
   - stores logs in Elasticsearch
5. Full request journey visible in logs + ES/Kibana.

---

## 📡 Communication Pattern & Justification

### ✔ Chosen Method: RabbitMQ (Message Queue)

**Why RabbitMQ?**
- Async + reliable delivery  
- Decouples microservices  
- Supports retries/durability  
- Ideal for event-driven routing  
- Lightweight + easy to develop locally

**Alternatives**
| Alternative | Why Not Used |
|------------|--------------|
| Kafka | Heavy for this simple routing use case |
| Redis Streams | No built-in routing patterns |
| REST-only | Tight coupling, no async processing |

---

#  2. Working Prototype

All three services run independently:

| Service | Port | Purpose |
|---------|-------|-----------|
| Task Router Service | 3001 | Validate + route messages |
| Delivery Service | 3002 | Simulate delivery |
| Logging Service | 3003 | Store logs to Elasticsearch |

RabbitMQ:
- `5672` AMQP
- `15672` Management UI

---

# Setup Instructions (Local — No Docker)

## Step 1 — Install RabbitMQ

Download: https://www.rabbitmq.com/download.html

Check status:


---

## Step 2 — Install Dependencies

Run for each service:


---

## Step 3 — Start Each Service

### Task Router
cd task-router-service
node server.js

### Delivery Service
cd delivery-service
node server.js

### Logging Service
cd logging-service
node server.js



---

## Step 4 — Verify Queues

Open:
http://localhost:15672

Login:
- user: **guest**
- pass: **guest**

Queues you will see:
- `email_queue`
- `sms_queue`
- `whatsapp_queue`

---

# 📬 Example API Payloads (Postman)

### 1️⃣ Send SMS
POST http://localhost:3001/send

Content-Type: application/json

{
"channel": "sms",
"to": "9876543210",
"body": "Hello from SMS!"
}

### Expected Output
{
"status": "Message routed",
"queue": "sms_queue",
"messageId": "a21f-9b2c-..."
}

---

### 2️⃣ Send Email
{
"channel": "email",
"to": "test@example.com
",
"body": "Welcome onboard!"
}

---

### 3️ Send WhatsApp Message
{
"channel": "whatsapp",
"to": "9198989898",
"body": "Hi! This is WhatsApp"
}

---

#  Logs (Delivery Service)

[DELIVERED] SMS → 9876543210 | Message: "Hello from SMS!" | ID: a21f-9b2c

---

# Observability (Logging Service → Elasticsearch)

Example log entry:

{
"service": "task-router",
"traceId": "a21f-9b2c",
"event": "ROUTED",
"channel": "sms",
"timestamp": "2025-11-27T10:22:11"
}

---



# Final Notes

This project demonstrates a clean **event-driven microservice architecture** built for real-world communication systems.

