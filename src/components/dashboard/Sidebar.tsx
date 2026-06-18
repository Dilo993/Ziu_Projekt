import { Box, Drawer, Toolbar, List, ListItem, ListItemButton, ListItemText, Divider, Typography } from '@mui/material';

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

const drawerWidth = 240;

export default function Sidebar({ mobileOpen, onDrawerToggle }: SidebarProps) {
  const drawerContent = (
    <Box sx={{ height: '100%', bgcolor: 'background.paper' }}>
      <Toolbar>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
          Nawigacja strukturalna
        </Typography>
      </Toolbar>
      <Divider />
      <List component="nav" aria-label="Menu boczne szczegółów projektu">
        <ListItem disablePadding>
          <ListItemButton component="a" href="#main-content" onClick={onDrawerToggle}>
            <ListItemText primary="Obszar roboczy" secondary="Skocz do widoku głównego" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ p: 2, position: 'absolute', bottom: 0, width: '100%' }}>
        <Typography variant="caption" display="block" color="text.secondary" align="center">
          Informatyka II Stopień • 2026
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="Menu główne aplikacji">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }} 
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>


      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid #e0e0e0' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}