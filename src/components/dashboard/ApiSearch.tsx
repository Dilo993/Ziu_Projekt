import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  TextField, CircularProgress, Alert, Grid as Grid, 
  Card, CardContent, Typography, Box, CardMedia 
} from '@mui/material';


const fetchCharacters = async (name: string) => {
  if (!name) return [];
  const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
  return data.results;
};

export default function ApiSearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['characters', searchTerm],
    queryFn: () => fetchCharacters(searchTerm),
    enabled: searchTerm.length > 2,
  });

  return (
    <Box component="section" sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Szukaj postaci z Rick and Morty..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        helperText="Wpisz co najmniej 3 znaki"
        sx={{ mb: 4 }}      />

      {(isLoading || isFetching) && searchTerm.length > 2 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress aria-label="Ładowanie wyników..." />
        </Box>
      )}

      {isError && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Nie znaleziono postaci pasujących do Twojego zapytania.
        </Alert>
      )}

      <Grid container spacing={3}>
        {data?.map((char: any) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={char.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={char.image}
                alt={`Portret postaci: ${char.name}`}
                sx={{ height: 220 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                  {char.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gatunek: {char.species}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: char.status === 'Alive' ? 'success.main' : 'error.main',
                    fontWeight: 'bold' 
                  }}
                >
                  Status: {char.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}