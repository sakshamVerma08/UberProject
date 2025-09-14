# 🚦 Socket.IO Backend (socket.js)

This module manages all **real-time communication** between users and captains in the Uber-clone backend using [Socket.IO](https://socket.io/).  
It handles **connections**, **location updates**, and provides a utility for sending targeted messages to specific clients by their `socketId`.

---

## 📂 File Overview

`socket.js` exposes two key functions:

1. **`initializeSocket(server)`**

   - Initializes a Socket.IO instance with CORS enabled.
   - Listens for and handles all socket events such as `join`, `update-location-captain`, and `disconnect`.

2. **`sendMessageToSocketId(socketId, messageObject)`**
   - Emits an event directly to a client by their `socketId`.
   - Useful for sending ride requests, confirmations, or any other targeted messages.

🔹 Description

Sends a custom event to a specific client identified by socketId.

Allows direct communication like:

Sending ride requests to captains.

Notifying users of ride confirmations.

Delivering status updates (driver arrived, trip started, trip ended).

🔹 Frontend Note

➡️ Make sure to listen for these events on the client side:

---

## ⚡ Socket Events

### 1. `connection`

- Triggered whenever a new client connects.
- Logs the `socket.id` of the client.

---

### 2. `join`

#### 📥 Incoming Event

```js
socket.emit("join", { userId, userType });
```

Description

Associates a User or Captain with their current socketId in MongoDB.

This is essential for delivering targeted events (e.g., sending a ride request to a specific captain).

🔹 Backend Behavior

If userType === "user", updates the user’s socketId.

If userType === "captain", updates the captain’s socketId.

🔹 Frontend Note

➡️ Call this event immediately after login/registration so the backend knows where to send events.

### 3. `update-location-captain`

#### 📤 Incoming Event

```

socket.emit("update-location-captain", {
  userId: "<captainId>",
  location: { ltd: 28.61, lng: 77.23 }
});
```

Description

Keeps the captain’s real-time location updated in MongoDB.

Validates location object (ltd and lng must be numbers).

🔹 Backend Behavior

Updates the location field of the captainModel.

Emits an error event if location data is invalid.

🔹 Frontend Note

➡️ Call this event periodically (e.g., every few seconds) from the captain’s app while they are online.



#### FRONTEND SOCKET JS EVENTS #######

## 1. `ride-confirmed-by-user`

#### 📤 Incoming Event

```js
socket.on("ride-confirmed-by-user", (data) => {
  console.log(data);
});
```

Description

When a user confirms a ride from <ConfirmRidePopUpPanel/>, this socket event is emitted within the confirmRide() function.

🔹 Backend Behavior

