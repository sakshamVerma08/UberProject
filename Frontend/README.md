# Uber Project Frontend Documentation

This document provides an overview of the frontend structure of the Uber Project, detailing each component, context, and page within the application.

## Project Structure

The frontend is organized into several key directories and files:

- **`src/`**: Contains the main source code for the frontend application.
- **`components/`**: Reusable UI components.
- **`context/`**: Context providers for managing global state.
- **`pages/`**: Different pages of the application.
- **`App.jsx`**: Main application component that sets up routing.
- **`index.css`**: Global styles for the application.
- **`main.jsx`**: Entry point for the React application.

## Components

### CaptainDetails.jsx
Displays the captain's profile details, including their name, earnings, and online hours.

### ConfirmRidePopUpPanel.jsx
A popup panel that allows captains to confirm a ride. It includes OTP input for ride confirmation.

### FinishRide.jsx
Component for finishing a ride, displaying ride details and a button to complete the ride.

### LocationSearchPanel.jsx
Provides a list of sample locations for users to select as their pickup or drop-off points.

### LookingForDriver.jsx
Displays a loading screen while the system searches for a driver for the user.

### RidePopUp.jsx
Notifies captains of a new ride request, allowing them to accept or ignore the ride.

### VehiclePanel.jsx
Allows users to choose a vehicle type for their ride, displaying options like UberGo, UberMoto, etc.

### WaitForDriver.jsx
Displays information about the driver and vehicle while the user waits for the driver to arrive.

## Context

### CaptainContext.jsx
Provides global state management for captain-related data, including captain details and loading states.

### ConfirmPanel.jsx
Handles the confirmation of rides, allowing users to confirm their ride details.

### UserContext.jsx
Manages global state for user-related data, including user details and authentication status.

## Pages

### CaptainHome.jsx
The home page for captains, displaying their details and ride notifications.

### CaptainLogin.jsx
Login page for captains, allowing them to authenticate and access their dashboard.

### CaptainLogout.jsx
Handles the logout process for captains, clearing authentication tokens.

### CaptainProtectedWrapper.jsx
A higher-order component that protects captain routes, ensuring only authenticated captains can access them.

### CaptainRiding.jsx
Displays the current ride details for captains, allowing them to finish the ride.

### CaptainSignup.jsx
Registration page for captains, allowing them to sign up with their details and vehicle information.

### Home.jsx
The main home page for users, allowing them to search for rides and select pickup/drop-off locations.

### Riding.jsx
Displays the current ride details for users, including driver information and payment options.

### Start.jsx
The initial landing page for the application, providing a starting point for users.

### UserLogin.jsx
Login page for users, allowing them to authenticate and access their dashboard.

### UserLogout.jsx
Handles the logout process for users, clearing authentication tokens.

### UserProtectedWrapper.jsx
A higher-order component that protects user routes, ensuring only authenticated users can access them.

### UserSignup.jsx
Registration page for users, allowing them to sign up with their personal details.

## Styles and Configuration

- **`App.css`**: Contains styles specific to the application components.
- **`index.css`**: Global styles for the application, including Tailwind CSS imports.
- **`tailwind.config.js`**: Configuration file for Tailwind CSS.
- **`vite.config.js`**: Configuration file for Vite, the build tool used for the project.

## Additional Information

- The frontend is built using React and Vite, with Tailwind CSS for styling.
- State management is handled using React Context API.
- Routing is managed using React Router.

This documentation provides a detailed overview of the frontend structure, components, and functionality, ensuring a clear understanding of the project's architecture.
# Uber Project Frontend Documentation

This document provides an overview of the frontend structure of the Uber Project, detailing each component, context, and page within the application.

## Project Structure

The frontend is organized into several key directories and files:

- **`src/`**: Contains the main source code for the frontend application.
- **`components/`**: Reusable UI components.
- **`context/`**: Context providers for managing global state.
- **`pages/`**: Different pages of the application.
- **`App.jsx`**: Main application component that sets up routing.
- **`index.css`**: Global styles for the application.
- **`main.jsx`**: Entry point for the React application.

## Components

### CaptainDetails.jsx
Displays the captain's profile details, including their name, earnings, and online hours.

### ConfirmRidePopUpPanel.jsx
A popup panel that allows captains to confirm a ride. It includes OTP input for ride confirmation.

### FinishRide.jsx
Component for finishing a ride, displaying ride details and a button to complete the ride.

### LocationSearchPanel.jsx
Provides a list of sample locations for users to select as their pickup or drop-off points.

### LookingForDriver.jsx
Displays a loading screen while the system searches for a driver for the user.

### RidePopUp.jsx
Notifies captains of a new ride request, allowing them to accept or ignore the ride.

### VehiclePanel.jsx
Allows users to choose a vehicle type for their ride, displaying options like UberGo, UberMoto, etc.

### WaitForDriver.jsx
Displays information about the driver and vehicle while the user waits for the driver to arrive.

## Context

### CaptainContext.jsx
Provides global state management for captain-related data, including captain details and loading states.

### ConfirmPanel.jsx
Handles the confirmation of rides, allowing users to confirm their ride details.

### UserContext.jsx
Manages global state for user-related data, including user details and authentication status.

## Pages

### CaptainHome.jsx
The home page for captains, displaying their details and ride notifications.

### CaptainLogin.jsx
Login page for captains, allowing them to authenticate and access their dashboard.

### CaptainLogout.jsx
Handles the logout process for captains, clearing authentication tokens.

### CaptainProtectedWrapper.jsx
A higher-order component that protects captain routes, ensuring only authenticated captains can access them.

### CaptainRiding.jsx
Displays the current ride details for captains, allowing them to finish the ride.

### CaptainSignup.jsx
Registration page for captains, allowing them to sign up with their details and vehicle information.

### Home.jsx
The main home page for users, allowing them to search for rides and select pickup/drop-off locations.

### Riding.jsx
Displays the current ride details for users, including driver information and payment options.

### Start.jsx
The initial landing page for the application, providing a starting point for users.

### UserLogin.jsx
Login page for users, allowing them to authenticate and access their dashboard.

### UserLogout.jsx
Handles the logout process for users, clearing authentication tokens.

### UserProtectedWrapper.jsx
A higher-order component that protects user routes, ensuring only authenticated users can access them.

### UserSignup.jsx
Registration page for users, allowing them to sign up with their personal details.

## Styles and Configuration

- **`App.css`**: Contains styles specific to the application components.
- **`index.css`**: Global styles for the application, including Tailwind CSS imports.
- **`tailwind.config.js`**: Configuration file for Tailwind CSS.
- **`vite.config.js`**: Configuration file for Vite, the build tool used for the project.

## Additional Information

- The frontend is built using React and Vite, with Tailwind CSS for styling.
- State management is handled using React Context API.
- Routing is managed using React Router.

This documentation provides a detailed overview of the frontend structure, components, and functionality, ensuring a clear understanding of the project's architecture.
