# Log Ingester

This is the backend for the Log Ingester, which allows you to ingest, and query logs

## API Documentation

### 1. Ingest Log

**Endpoint:** `/api/logs`

**Method:** `POST`

**Request Body:**

```json
{
  "level": "error",
  "message": "Failed to connect to DB",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
    "parentResourceId": "server-0987"
  }
}
```

**Response:**

```json
{
  "msg": "success",
  "data": {}
}
```

### 2. Search Logs

**Endpoint:** `/api/logs`

**Method:** `GET`

**Query Parameters:**

- `level`
- `message`
- `resourceId`
- `timestamp`
- `traceId`
- `spanId`
- `commit`
- `parentResourceId`

**Response:**

```json
[
  {
    "level": "error",
    "message": "Failed to connect to DB",
    "resourceId": "server-1234",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
      "parentResourceId": "server-0987"
    }
  },
]
```

## Running the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/vrutik2809/log-ingester-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd log-ingester-backend
   ```

3. Just run

   ```bash
   docker-compose up -d
   ```
  
   it will start the elasticsearch server on `localhost:9200` and log ingester server on `localhost:3000`

> **Note:** If you don't have docker runtime then set the appropriate environment variables for elasticsearch mentioned in `.env.example` file and then install the dependencies using `npm install` and then start the server using `npm run start`
