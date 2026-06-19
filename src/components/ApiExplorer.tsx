import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Stack,
  Card,
  CardContent,
  CircularProgress,
  Avatar
} from '@mui/material';
interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  image: string;
}

export default function ApiExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryParam, setQueryParam] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['characters', queryParam],
    queryFn: async () => {
      const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${queryParam}`);
      if (!res.ok) {
        if (res.status === 404) return { results: [] };
        throw new Error('Błąd podczas pobierania danych z API');
      }
      return res.json();
    },
    enabled: true
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    setQueryParam(trimmedSearch)  };

  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
        Eksplorator Danych API (TanStack Query)
      </Typography>

      <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 4 }} noValidate>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label="Wyszukaj postać..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              htmlInput: { 'aria-label': 'Wpisz imię postaci do wyszukania w API' }
            }}
          />
          <Button 
            type="submit" 
            variant="outlined" 
            size="large"
            sx={{
              minWidth: 140,
              color: '#003cd6', 
              borderColor: '#003cd6',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#002699',
                backgroundColor: 'rgba(0, 60, 214, 0.04)',
              }
            }}
          >
            Filtruj
          </Button>
        </Stack>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }} aria-live="polite">
          <CircularProgress color="primary" />
          <Typography sx={{ ml: 2, alignSelf: 'center' }}>Ładowanie danych z API...</Typography>
        </Box>
      )}

      {isError && (
        <Paper sx={{ p: 2, bgcolor: '#fdf2f2', border: '1px solid #f5c2c2', mb: 2 }} aria-live="assertive">
          <Typography color="error.main" sx={{ fontWeight: 500 }}>
            {(error as Error).message || 'Wystąpił nieoczekiwany błąd sieci.'}
          </Typography>
        </Paper>
      )}

      {!isLoading && !isError && (
        <Stack spacing={2} component="ul" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {data?.results && data.results.length > 0 ? (
            data.results.map((character: Character) => (
              <Box key={character.id} component="li">
                <Card 
                  variant="outlined" 
                  sx={{ 
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      borderColor: '#003cd6',
                      boxShadow: '0px 6px 20px rgba(0, 60, 214, 0.12)',
                      backgroundColor: 'rgba(0, 60, 214, 0.01)'
                    },
                    '@media (prefers-reduced-motion: reduce)': {
                      transition: 'none',
                      '&:hover': {
                        transform: 'none',
                        boxShadow: 'none',
                        borderColor: 'text.primary'
                      }
                    }
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Avatar 
                        src={character.image} 
                        alt="" 
                        sx={{ width: 56, height: 56, border: '1px solid #e0e0e0' }}
                      />
                      <Box>
                        <Typography variant="h6" component="h3" sx={{ color: 'text.primary', fontWeight: 600, lineHeight: 1.2 }}>
                          {character.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                          Gatunek: {character.species} — Status: {character.status}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            <Typography align="center" color="text.secondary" sx={{ py: 4 }} component="li">
              Nie znaleziono żadnych postaci pasujących do kryteriów.
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
}