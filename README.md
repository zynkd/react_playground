This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Background

This is a simple application that uses many fundamentals of React. It is fully responsive and uses TailwindCSS for styling.

It uses easy to read, clean and maintainable code. The application is optimized for performance (use of memoization of prop callbacks, components and of API call), and SEO friendly (e.g. no content shifts on alerts or real-time validation, enhancing accessibility, using semantic HTML).

It uses the power of React by using reusable components (Alerts, Buttons, Inputs) as well as Higher-order components to extend the functionality of simpler components (Spinner overlay, Flashing effect), conditional rendering, conditional styling, states, props, various event listeners, REST API call etc. It includes many states, but doesn’t create unnecessary ones (e.g. hasErrorColor is only a variable derived from errorMessageColor state).

# Features

### Count Tracking
- Display the current count value.
- Increase the count using a customizable increment.
- Reset the count and increment to their initial values.
- Custom Increment Selection

### Choose from predefined increment values (1 to 5).
- Set a custom increment value between 1 and 100.
- Validate custom increment input to ensure it's a valid integer within the specified range.
- Color Theme Selection

### Select color themes from a dropdown list of predefined options.
- Input and apply custom color themes using hexadecimal values.
- Fetch color data from an external API and populate the color theme options.
- Display a loading spinner while fetching color data.

### Alerts
- Display warning alerts for invalid increment and color inputs.
- Show relevant error messages when an invalid input is detected.
- Automatically hide alerts after a brief duration.

### Responsive Design
- The application is designed to be responsive, adapting to various screen sizes.
- Components are styled using Tailwind CSS utility classes for consistent styling.

### UI Interaction
- Use interactive buttons to trigger count increases and resets.
- Dynamically change button colors based on the selected color theme.
- Update the count and color in real-time as user interactions occur.

### Validation and User Feedback
- Validate and provide feedback on custom increment and color inputs.
- Prevent submitting the form when custom inputs are invalid.

### API Integration
- Fetch color data from an external API using the fetch function.
- Utilize the useEffect hook to update the color options after fetching data.

### Code Organization
- Organize the code into functional components for better readability and maintainability.
- Utilize React hooks (useState, useEffect, useCallback, useMemo) for state management and side effects.

### Form Submission Handling
- Handle form submissions and prevent the default behavior.

# Usage

- Clone the repository: git clone [repository_url]
- Install dependencies: npm install
- Start the development server: npm start
- Open your browser and navigate to http://localhost:3000 to use the app.

# Technologies Used

- React
- Tailwind CSS
