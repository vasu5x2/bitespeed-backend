# Bitespeed Identity Service

This is a Node.js-based web service that provides an `/identify` endpoint for customer identity tracking.

## Hosted API Endpoint
The service is hosted on **Render** and can be accessed at:

`https://bitespeed-backend-qe89.onrender.com/identify`

## Usage
### Identify Customer
**Endpoint:** `POST /identify`

**Request Body:**
```json
{
  "email": "example@example.com",
  "phoneNumber": "1234567890"
}
```

**Response Example:**
```json
{
  "contact": {
    "primaryContatctId": 1,
    "emails": ["example@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": []
  }
}
```

## Deployment
This service is deployed on **Render** and uses a **PostgreSQL** database.

### Environment Variables
Ensure the following environment variables are set:
```
PORT=4000
DB_USER=vasu
DB_HOST=dpg-cuks9at2ng1s7380ie90-a.oregon-postgres.render.com
DB_NAME=mydatabase_hc5m
DB_PASSWORD=lVB5r8SBtocQYE9Nsv4KvpFBpkyO1QtN
DB_PORT=5432
```

## Technologies Used
- **Node.js** (Express.js)
- **PostgreSQL** (Hosted on Render)
- **Render.com** (For deployment)



Ensure you update the `.env` file with the correct database credentials.

## Author
**Vasu **

