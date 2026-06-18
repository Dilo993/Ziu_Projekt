import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Stack } from '@mui/material';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Wszystkie pola są wymagane.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Hasła nie są identyczne.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków.');
      return;
    }

    console.log('Formularz wysłany pomyślnie!', formData);

    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('Form Submit Success');
    }

    setSuccess(true);
    alert('Rejestracja zakończona sukcesem!');

    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Konto zostało utworzone pomyślnie!</Alert>}

        <TextField
          label="Nazwa użytkownika"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Adres E-mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Hasło"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Potwierdź hasło"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          size="large"
          fullWidth
        >
          Zarejestruj się
        </Button>
      </Stack>
    </Box>
  );
}