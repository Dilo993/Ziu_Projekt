import { AnimatePresence, motion } from 'framer-motion';
import { Alert, Box } from '@mui/material';

interface Toast {
  id: string;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

const toastVariants = {
  initial: { opacity: 0, x: 50, scale: 0.9 },
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  },
  exit: { 
    opacity: 0, 
    x: 50, 
    scale: 0.85, 
    transition: { duration: 0.15 } 
  }
};

export default function ToastContainer({ toasts, onClose }: { toasts: Toast[]; onClose: (id: string) => void }) {
  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
          >
            <Alert severity={toast.severity} onClose={() => onClose(toast.id)} sx={{ minWidth: 250, boxShadow: 3 }}>
              {toast.message}
            </Alert>
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
}