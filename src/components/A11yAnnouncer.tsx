import { Box } from '@mui/material';

interface A11yAnnouncerProps {
  announcement: string;
}

export default function A11yAnnouncer({ announcement }: A11yAnnouncerProps) {
  return (
    <Box
      role="status"
      aria-live="polite"
      aria-atomic="true"
      sx={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        border: 0,
      }}
    >
      {announcement}
    </Box>
  );
}