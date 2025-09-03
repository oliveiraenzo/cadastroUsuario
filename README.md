# User Registration

This is a simple user registration application built with React Native and Expo.

## Features

- User registration with the following fields:
    - Code
    - Name
    - Email
    - Password
- Field validation to ensure that the entered data is valid.
- Local data persistence on the device using `AsyncStorage`.
- Buttons to Save, Load, and Clear the form data.

## How to Run the Project

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/oliveiraenzo/cadastroUsuario.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd cadastro
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Start the Expo development server:**
    ```bash
    expo start
    ```

5.  **Run on your device or emulator:**
    -   Scan the QR code with the Expo Go app (available for Android and iOS).
    -   Or use the options in the terminal to open it in an Android emulator or iOS simulator.

## Technologies Used

-   [React Native](https://reactnative.dev/)
-   [Expo](https://expo.dev/)
-   [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)