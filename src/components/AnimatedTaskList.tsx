import { motion, useReducedMotion } from 'framer-motion';
import { Paper, Typography } from '@mui/material';

interface Task {
  id: number;
  text: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export default function AnimatedTaskList({ tasks }: { tasks: Task[] }) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100 } 
    }
  };

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ listStyle: 'none', padding: 0, margin: 0 }}
    >
      {tasks.map((task) => (
        <motion.li 
          key={task.id} 
          variants={itemVariants} 
          style={{ marginBottom: '12px' }}
        >
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              alignItems: 'center',
              backgroundColor: 'background.paper'
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {task.text}
            </Typography>
          </Paper>
        </motion.li>
      ))}
    </motion.ul>
  );
}