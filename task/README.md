# **QuickList**

**Overview**

QuickList is a simple and intuitive task management application built using React. It allows users to add, edit, delete, and mark tasks as completed. Tasks are persisted in local storage to ensure they remain available after a page refresh. The application features a clean and responsive user interface designed for desktop and mobile devices.

**Features**

**Core Features:**

- **Add New Tasks:**
  - Users can add new tasks by entering text in the input field.
  - Tasks cannot be empty or exceed 25 characters.
  - Duplicate tasks are not allowed.

- **Mark Tasks as Completed:**
  - Tasks can be marked as completed by checking the corresponding checkbox.
  - Completed tasks are visually distinguished from active tasks.

- **Edit Tasks:**
  - Users can edit the text of existing tasks.
  - Validation ensures tasks are not empty, too long, or duplicates of other tasks.

- **Delete Tasks:**
  - Users can delete individual tasks, whether active or completed.

- **Persist Tasks in Local Storage:**
  - Tasks are saved in the browser’s local storage to ensure persistence after a page refresh.

**Bonus Features:**

- **Clear All Completed Tasks:**
  - A button allows users to delete all completed tasks at once.
  - Confirmation prompts ensure accidental deletions are avoided.

- **Responsive Design:**
  - The application works seamlessly on both desktop and mobile devices.
  - Built using TailwindCSS for a clean and modern design.

- **Error Handling:**
  - Error messages are displayed for invalid actions such as adding an empty task, exceeding the character limit, or duplicating tasks.

**Technical Stack**

- **Frontend Framework:** React
- **Styling:** TailwindCSS
- **State Management:** React Context API with useContext and useState
- **Storage:** Local Storage for persisting tasks

**Libraries Used:**

- react-hot-toast for notifications
- react-icons for icons
- Editor: Visual Studio Code (VS Code) for development


**File Structure**

/src
  /components
    AddTasks.jsx          // Component for adding new tasks
    Heading.jsx           // Component for the app’s header
    ListTasks.jsx         // Component for displaying active and completed tasks
  /context
    taskContext.jsx       // Context for managing tasks and state
  /swals
    EditTaskModal.jsx     // Modal for editing tasks
    DeleteConfirmModal.jsx// Modal for delete confirmation
  App.js                 // Main app component


  **How to Run the Project**
  
    **npm run dev**