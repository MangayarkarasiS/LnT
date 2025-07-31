# Angular Standalone Service with JSON Server

This project provides a standalone Angular service (`ItemService`) for CRUD operations using a JSON server as a mock REST API.

## Files
- `item.service.ts`: Angular service for CRUD operations on `items`.
- `db.json`: Sample database for json-server.

## Setup Instructions

### 1. Install JSON Server
```
npm install -g json-server
```

### 2. Start JSON Server
```
json-server --watch db.json
```

JSON server will run at `http://localhost:3000/items`.

### 3. Use the Service in Angular
- Import `HttpClientModule` in your app.
- Inject `ItemService` where needed.

## Example Usage
```
this.itemService.getItems().subscribe(items => console.log(items));
```

---

For more details, see the comments in `item.service.ts`.
