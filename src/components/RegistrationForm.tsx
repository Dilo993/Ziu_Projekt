import { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  Typography, 
  Stack 
} from '@mui/material';
import { plausible } from '../analytics';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isInteracted, setIsInteracted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsInteracted(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    plausible.trackEvent('Form Submit Success', { props: { form_name: 'registration' } });

    console.log('Zarejestrowano użytkownika:', formData);
  };

  useEffect(() => {
    return () => {
      if (isInteracted && !isSubmitted) {
        plausible.trackEvent('Form Abandoned', { props: { last_active: 'registration_screen' } });
      }
    };
  }, [isInteracted, isSubmitted]);

  return (
    <Box 
      component={Paper} 
      elevation={2} 
      sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4, borderRadius: 2 }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
        Formularz rejestracji użytkownika
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          
          <Grid size={12}>
            <TextField
              required
              fullWidth
              id="username"
              name="username"
              label="Nazwa użytkownika"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              slotProps={{
                htmlInput: { 'aria-label': 'Wprowadź swoją nazwę użytkownika' }
              }}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Adres e-mail"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              slotProps={{
                htmlInput: { 'aria-label': 'Wprowadź swój adres e-mail' }
              }}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              label="Hasło"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              slotProps={{
                htmlInput: { 'aria-label': 'Wprowadź bezpieczne hasło' }
              }}
            />
          </Grid>

          <Grid size={12}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', width: '100%' }}>
              <Button 
                type="submit" 
                variant="outlined" 
                size="large"
                sx={{
                  color: '#003cd6',
                  borderColor: '#003cd6',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#002699',
                    backgroundColor: 'rgba(0, 60, 214, 0.04)',
                  }
                }}
              >
                Utwórz konto
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}