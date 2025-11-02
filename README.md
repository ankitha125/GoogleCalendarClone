# Google Calendar Clone

This project is a web-based clone of Google Calendar, designed to provide a similar user experience for managing events. It features a clean, modern interface with month, week, and day views, and supports creating, updating, and deleting events.

## Demo Video Link

* https://drive.google.com/file/d/1iGY259SjcFxq1PNHlYbUEqPpTKJElrUO/view?usp=sharing

## Features

*   **Multiple Calendar Views:** Switch between month, week, and day views to visualize your schedule.
*   **Event Management:** Create, edit, and delete events with a user-friendly modal.
*   **Responsive Design:** The application is designed to work on various screen sizes.
*   **Interactive UI:** Smooth animations and transitions for a better user experience.

## Architecture and Technology Choices

The application is built with a modern JavaScript stack, separating the frontend and backend for a clear and scalable architecture.

### Frontend

*   **Framework:** React (with Vite for a fast development experience).
*   **Styling:** Tailwind CSS for a utility-first CSS workflow.
*   **Date Management:** `dayjs` is used for all date and time manipulations.
*   **Animations:** `framer-motion` is used for smooth and beautiful animations, particularly in the event modal.
*   **API Communication:** `axios` and `fetch` are used to interact with the backend REST API.

### Backend

*   **Framework:** Node.js with Express.js, providing a simple and powerful REST API.
*   **Database:** MongoDB is used as the database, with Mongoose as the ODM (Object Data Modeling) library for interacting with the database.
*   **Middleware:** `cors` is used to enable Cross-Origin Resource Sharing.

## Setup and Run Instructions

### Prerequisites

*   Node.js and npm (or yarn)
*   MongoDB (a running instance, either local or cloud-based)

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  **Configuration:** Create a `.env` file in the `backend` directory and add your MongoDB connection string as `MONGO_URL`:
    ```
    MONGO_URL=your_mongodb_connection_string
    ```
4.  Start the backend server:
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:3000`.

### Frontend

1.  Navigate to the `googlecalendarclone` directory:
    ```bash
    cd googlecalendarclone
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Business Logic and Edge Cases

### Event Management

*   Events are created, updated, and deleted through the `EventModal` component.
*   The modal is used for both creating new events and editing existing ones.
*   The start and end times for events are stored as ISO 8601 strings in the database.

### View Navigation

*   The calendar view can be switched between month, week, and day.
*   Users can navigate to the next or previous month, week, or day.
*   A "Today" button allows users to quickly jump back to the current date.

### Overlap Conflicts

Currently, the application does not handle event overlap conflicts. It is possible to create multiple events that occupy the same time slot. This is a potential area for future enhancement.

## Animations and Interactions

*   The `EventModal` uses `framer-motion` to animate its appearance and disappearance, providing a smooth and professional feel.
*   CSS transitions are used throughout the application for hover effects and other small interactions.

## Future Enhancements

*   **Recurring Events:** Implement functionality to create events that repeat on a schedule.
*   **Event Overlap Handling:** Add logic to detect and visually indicate when events overlap.
*   **Drag-and-Drop:** Allow users to reschedule events by dragging and dropping them to a new time slot.
*   **Notifications:** Implement reminders for upcoming events.
*   **User Authentication:** Add user accounts to allow multiple users to have their own private calendars.
*   **Search Functionality:** Add the ability to search for events.

