import TaskList from './components/TaskList/TaskList';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <TaskList />
    </ThemeProvider>
  );
}

export default App;
