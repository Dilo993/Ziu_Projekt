import { Card, CardContent, Box, Grid } from '@mui/material';

export default function CharacterSkeleton() {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ borderRadius: 2, height: '100%' }}>
        <Box className="shimmer-placeholder" sx={{ width: '100%', height: 200 }} />
        <CardContent>
          <Box className="shimmer-placeholder" sx={{ width: '80%', height: 24, mb: 1, borderRadius: 1 }} />
          <Box className="shimmer-placeholder" sx={{ width: '40%', height: 18, borderRadius: 1 }} />
        </CardContent>
      </Card>
    </Grid>
  );
}