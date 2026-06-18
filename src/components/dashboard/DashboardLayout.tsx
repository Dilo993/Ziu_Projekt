import { useState } from 'react';
import { Box, Toolbar, Container, Paper, Typography, Stack, Button, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ApiExplorer from '../ApiExplorer';
import TodoList from '../TodoList';
import RegistrationForm from '../RegistrationForm';

const pageTransitionVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeInOut' } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.18 } }
};

export default function DashboardLayout() {
  const [view, setView] = useState<'tasks' | 'register' | 'api'>('tasks');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const shouldReduceMotion = useReducedMotion();

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#121212' : '#fafafa',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
        
        <Button
          component="a"
          href="#main-content"
          sx={{
            position: 'absolute', top: -100, left: 20,
            bgcolor: 'primary.main', color: 'white',
            '&:focus': { top: 20, zIndex: 4000, bgcolor: 'primary.dark' }
          }}
        >
          Przeskocz do głównej zawartości strony
        </Button>

        <Box 
          id="main-content" 
          component="main" 
          role="main" 
          tabIndex={-1} 
          sx={{ flexGrow: 1, p: 3, width: '100%' }}
        >
          <Toolbar />
          <Container maxWidth="lg">
            
            <Stack 
              direction="row" 
              spacing={2} 
              sx={{ 
                mb: 4, 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}
            >
              <Stack direction="row" spacing={1} role="tablist" aria-label="Główne widoki aplikacji" sx={{ flexWrap: 'wrap', gap: 1 }}>
                <Button role="tab" aria-selected={view === 'tasks'} variant={view === 'tasks' ? 'contained' : 'outlined'} onClick={() => setView('tasks')}>
                  Zadania Todo (Lab 1-6)
                </Button>
                <Button role="tab" aria-selected={view === 'register'} variant={view === 'register' ? 'contained' : 'outlined'} onClick={() => setView('register')}>
                  Formularz (Lab 7)
                </Button>
                <Button role="tab" aria-selected={view === 'api'} variant={view === 'api' ? 'contained' : 'outlined'} onClick={() => setView('api')}>
                  Wyszukiwarka API (Lab 9-11)
                </Button>
              </Stack>

              <Button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                color="inherit"
                variant="outlined"
                startIcon={isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                aria-label={isDarkMode ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"}
                sx={{ borderColor: 'divider', minWidth: '150px' }}
              >
                {isDarkMode ? "Tryb Jasny" : "Tryb Ciemny"}
              </Button>
            </Stack>

            <AnimatePresence mode="wait">
              {view === 'tasks' && (
                <Box
                  key="tasks"
                  component={shouldReduceMotion ? 'div' : motion.div}
                  {...(!shouldReduceMotion && { variants: pageTransitionVariants, initial: "initial", animate: "animate", exit: "exit" })}
                >
                  <Box component="section" aria-labelledby="todo-title-id">
                    <Typography id="todo-title-id" variant="h4" component="h2" sx={{ mb: 3, fontWeight: 800 }}>
                      Zadania i Plan Dnia
                    </Typography>
                    <Paper sx={{ p: 4, borderRadius: 2, backgroundImage: 'none', transition: 'background-color 0.3s ease' }}>
                      <TodoList />
                    </Paper>
                  </Box>
                </Box>
              )}

              {view === 'register' && (
                <Box
                  key="register"
                  component={shouldReduceMotion ? 'div' : motion.div}
                  {...(!shouldReduceMotion && { variants: pageTransitionVariants, initial: "initial", animate: "animate", exit: "exit" })}
                >
                  <Box component="section" aria-labelledby="register-title-id">
                    <Paper sx={{ p: 4, borderRadius: 2, backgroundImage: 'none', transition: 'background-color 0.3s ease' }}>
                      <Typography id="register-title-id" variant="h4" component="h2" sx={{ mb: 3, fontWeight: 800 }}>
                        Formularz Rejestracyjny Użytkownika
                      </Typography>
                      <RegistrationForm />
                    </Paper>
                  </Box>
                </Box>
              )}

              {view === 'api' && (
                <Box
                  key="api"
                  component={shouldReduceMotion ? 'div' : motion.div}
                  {...(!shouldReduceMotion && { variants: pageTransitionVariants, initial: "initial", animate: "animate", exit: "exit" })}
                >
                  <Box component="section" aria-labelledby="api-section-id">
                    <span id="api-section-id" style={{ display: 'none' }}>Sekcja integracji API</span>
                    <ApiExplorer />
                  </Box>
                </Box>
              )}
            </AnimatePresence>

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}