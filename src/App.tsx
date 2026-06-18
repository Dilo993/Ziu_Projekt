import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardLayout from './components/dashboard/DashboardLayout';
import TodoList from './components/TodoList';
import ApiExplorer from './components/ApiExplorer';

const pageVariants = {
  initial: { opacity: 0, x: -16 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.28, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    x: 16, 
    transition: { duration: 0.18, ease: 'easeIn' } 
  }
};

export default function App() {
  const location = useLocation();

  return (
    <DashboardLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <TodoList />
              </motion.div>
            } 
          />
          <Route 
            path="/api" 
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                <ApiExplorer />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
    </DashboardLayout>
  );
}