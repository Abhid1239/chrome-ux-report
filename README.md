# Core Web Vitals Dashboard

## 1. Core Functionality & Exception Handling

### Core Functionality
- **User Input & Data Fetching:**  
  The main page (`app/page.tsx`) allows users to input one or more URLs and triggers a fetch to an API endpoint for Core Web Vitals data. The form is responsive and disables the submit button while loading.
- **Data Display:**  
  The `ShowcaseInsights` component receives the fetched data and displays it in a dynamic, sortable, and customizable table. Users can choose which metrics (columns) to show/hide and sort by any metric. The values are coloured based on the metric value.
- **Reusable & Extensible Structure:**  
  - All constants (metrics config), types (interfaces), and utility functions are modularized into separate files, promoting reusability and maintainability.
  - The dashboard is easily extensible: new metrics or features can be added by updating the relevant constants or types.

### Exception Handling & Completeness
- **Form Submission:**  
  The form uses `onSubmit` to prevent default reloads and calls a handler. The submit button is disabled during loading or if the input is empty, preventing duplicate or invalid submissions.
- **Error Handling:**  
  If an error occurs during data fetching or any one of the API fails, an error message is displayed to the user in a styled alert.
- **Loading State:**  
  While fetching data, a loading spinner and message are shown, providing clear feedback.
- **Data Validation:**  
  The code checks for the presence of data before rendering the insights table, ensuring no runtime errors from undefined data.
- **Type Safety:**  
  All data structures are strongly typed using TypeScript interfaces, reducing the risk of runtime errors and improving code reliability.

---

## 2. Object-Oriented Development & Clean Code

- **Separation of Concerns:**  
  - UI components (`ShowcaseInsights`, table, tooltips, dropdowns) are separated from business logic and configuration.
  - Constants, types, and utility functions are placed in dedicated files.
- **Reusability:**  
  - Utility functions (e.g., for background class calculation) are reusable across components.
  - Metric definitions and types are centralized for consistency.
- **Readability & Maintainability:**  
  - Descriptive variable and function names.
  - Consistent formatting and use of modern React/TypeScript patterns.
  - Minimal code duplication (DRY principle).
- **Extensibility:**  
  - New metrics, columns, or features can be added with minimal changes to the codebase.

---

## 3. Design Document

### High-Level Architecture

```
/constants/coreWebVitals.ts      # Metric definitions/config
/types/webVitals.ts              # TypeScript interfaces/types
/utils/webVitalsUtils.ts         # Utility functions
/components/ui/ShowcaseInsights.tsx # Main insights table component
/app/page.tsx                    # Main page, handles user input and data fetching
```

### Data Flow

1. **User Input:**  
   User enters URLs and submits the form.
2. **Data Fetching:**  
   `app/page.tsx` fetches Core Web Vitals data for the URLs.
3. **Data Processing:**  
   Data is validated, errors are handled, and state is updated.
4. **Data Display:**  
   `ShowcaseInsights` receives and renders the data, allowing interactive sorting and column selection.

### Key Design Decisions

- **TypeScript for Type Safety:**  
  Ensures all data structures are well-defined and reduces runtime errors.
- **Component-Based UI:**  
  Promotes modularity, reusability, and easy maintenance.
- **Centralized Config & Types:**  
  All metric definitions and interfaces are in dedicated files, making updates and testing easier.
- **UI/UX Considerations:**  
  - Responsive layout.
  - Clear feedback for loading and errors.
  - User-friendly controls for sorting and column visibility.

---

## 4. Library Choices & Rationale

- **React:**  
  Provides a component-based architecture, making UI development modular and reusable.
- **TypeScript:**  
  Adds static type checking, improving code safety, maintainability, and developer experience.
- **Lucide-react (Icons):**  
  For modern, customizable SVG icons (e.g., sorting arrows), enhancing UI clarity.
- **ShadCDN UI (UI Components):**  
  Offers accessible, unstyled primitives for dropdown menus and tooltips, allowing for flexible and consistent UI/UX.

**Why these choices?**  
- **Maintainability:** Centralized configuration and types make the codebase easy to update and extend.
- **Robustness:** TypeScript and clear error handling reduce the risk of bugs.
- **User Experience:** Modern UI libraries and thoughtful feedback mechanisms ensure a smooth, intuitive experience.
- **Scalability:** The architecture supports future enhancements (e.g., AI recommendations, more metrics) with minimal refactoring.


## 5. Future Improvements

- Add AI recommendations based on the metrics, more metrics and features.
- Migrate to TankStack Query for data fetching.
- Migrate to Data Table for more features.


