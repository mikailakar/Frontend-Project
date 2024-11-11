# Frontend-Project

This project is a dictionary application built using Angular. The application queries an external dictionary API to fetch word definitions, synonyms, pronunciations, and more. Users can also save words to their favorites, listen to word pronunciations, and manage their favorite words with functionalities such as adding, removing, and displaying them.

## Features

- **Word Search**: Enter a word to fetch its definition, synonyms, and pronunciation.
- **Pronunciation**: Listen to the pronunciation of a word via an API that returns an MP3 file.
- **Favorites**: Add words to favorites and store them in the local storage.
- **Favorite Management**: View and remove words from favorites on a dedicated page. Also, display alerts and toaster messages when words are added or removed.
- **Word Synonym Search**: Click on a synonym to search for its meaning.
- **Signup Form**: A form that allows users to register by providing their name, number, email, city, and district information.
- **Reactive Forms**: Form validation for the signup process, with constraints like required fields, valid email format, number format, etc.
- **Dark Mode**: Implemented a dark mode toggle with local storage persistence and dynamic UI adjustments based on user preference.
- **Multi-Language Support**: The application supports both English and Turkish languages with dynamic text switching.
- **Error Handling**: Error handling for API requests using RxJS and proper error messages displayed to the user.
- **API Integration**: Fetch word details from the [Dictionary API](https://dictionaryapi.dev/), including definitions, synonyms, and pronunciations in MP3 format.
- **Local Storage**: Manage favorite words by saving them to local storage and displaying them across sessions.

## Components

1. **Word Search Component**: The main search area where users can input a word and get its details (definition, synonyms, pronunciation).
2. **Favorites Component**: Displays a list of favorite words, allowing users to remove them and view alerts when changes occur.
3. **Signup Component**: A form for user registration with validation and dynamic city/district selection based on the user's input.
4. **Loading Spinner**: A spinner is displayed while waiting for the API response, improving user experience during data fetching.

## Services

- **Favorites Service**: Manages the state of the favorite words and allows communication between components via Angular's `Injectable` service.
- **Word API Service**: Handles HTTP requests to fetch word definitions, synonyms, and pronunciations from the Dictionary API.
- **City/District Service**: Integrates the API for retrieving city and district information, allowing dynamic dropdowns in the signup form.

## Pipes

- **Angular Pipes**: Utilizes Angular’s built-in pipes such as `CurrencyPipe`, `DatePipe`, `DecimalPipe`, `UpperCasePipe`, `LowerCasePipe`, `TitleCasePipe`, and `AsyncPipe` to format data like currency, dates, and names.

## Features Implemented

### Word Search and API Integration
- Implemented an API call to the Dictionary API to fetch the definition, synonyms, and pronunciation of the entered word.
- Displayed the returned data dynamically in the UI, following the design in Figma.

### Favorites Management
- Allowed users to mark words as favorites using a heart icon (❤️).
- Stored favorites in the local storage and displayed them in the "Favorites" page.
- Added alert notifications and UI updates for adding/removing favorites.
- Implemented a confirmation dialog for removing words from favorites.

### Signup Form
- Created a user registration form using Angular Reactive Forms.
- Added validation for fields like name, phone number, email, and dynamic city/district selection.
- The form submission triggers a submitted form displaying the entered information.

### Dark Mode

- Implemented a dark mode toggle switch to allow users to switch between light and dark themes.
- Created a service to manage the application's theme state. This service listens for changes in theme preference and updates the UI accordingly.
- The user's theme preference (dark or light mode) is stored in local storage, so the theme persists across sessions.
- The application adjusts background colors, text colors, and button styles based on the selected theme to ensure good contrast and readability.
- Used CSS variables for theme colors, making it easier to switch between themes dynamically.

### Multi-Language Support (i18n)
- Integrated i18n for multi-language support, with English and Turkish as the initial languages.
- Language can be changed via a floating button, and the UI adapts to the selected language.

### Error Handling and Spinner
- Implemented error handling for API requests using RxJS.
- Showed a spinner while waiting for the API response and ensured the spinner is displayed for at least 1 second to enhance UX.

## API References

- [Dictionary API Documentation](https://dictionaryapi.dev/)
- [Turkish City and District API](https://github.com/ubeydeozdmr/turkiye-api)

## Conclusion

This project demonstrates how to build an Angular application that integrates with external APIs, handles user authentication, and provides interactive features such as managing favorites, form validation, dark mode, and multi-language support. It utilizes modern Angular techniques such as Reactive Forms, Services, and RxJS for effective data management and communication between components.

