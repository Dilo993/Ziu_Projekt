import { AppBar, Toolbar, IconButton, Typography, Tooltip } from '@mui/material';
import { Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';

interface AppHeaderProps {
  onDrawerToggle: () => void;
  onToggleDarkMode: () => void;
  mode: 'light' | 'dark';
}

export default function AppHeader({ onDrawerToggle, onToggleDarkMode, mode }: AppHeaderProps) {
  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: mode === 'light' ? 'primary.main' : 'background.paper',
        color: mode === 'light' ? 'white' : 'text.primary'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Otwórz menu boczne"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          System ZIU — Panel Projektowy
        </Typography>

        <Tooltip title={mode === 'light' ? 'Przełącz na tryb ciemny' : 'Przełącz na tryb jasny'}>
          <IconButton 
            onClick={onToggleDarkMode} 
            color="inherit"
            aria-label={mode === 'light' ? 'Włącz tryb nocny' : 'Włącz tryb dzienny'}
          >
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}