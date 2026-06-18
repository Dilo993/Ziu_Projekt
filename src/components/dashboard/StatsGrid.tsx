import { Grid } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import StatsCard from './StatsCard';
import { useTodoContext } from '../../context/TodoContext';

export default function StatsGrid() {
  const { state } = useTodoContext();
  const total = state.todos.length;
  const completed = state.todos.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <StatsCard title='Wszystkie' value={total} icon={FormatListBulletedIcon} color='#1565C0' bgColor='#E3F2FD' />
      </Grid>
      <Grid item xs={12} sm={4}>
        <StatsCard title='Ukończone' value={completed} icon={CheckCircleIcon} color='#2E7D32' bgColor='#E8F5E9' />
      </Grid>
      <Grid item xs={12} sm={4}>
        <StatsCard title='Oczekujące' value={pending} icon={RadioButtonUncheckedIcon} color='#E65100' bgColor='#FFF3E0' />
      </Grid>
    </Grid>
  );
}