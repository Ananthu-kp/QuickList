import AddTasks from "./components/AddTasks"
import Heading from "./components/Heading"
import ListTasks from "./components/ListTasks"

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-16 py-8">
      <Heading />
      <AddTasks />
      <ListTasks />
    </div>
  )
}

export default App
