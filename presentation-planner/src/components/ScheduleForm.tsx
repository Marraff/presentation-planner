import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { ProjectSchedule, Schedule, ScheduleType } from '../types';
import { createAlert } from '../utils/toastUtils';
import { isOverlapping } from '../utils/scheduleUtils';
import { useTranslation } from 'react-i18next';


interface Props {
  onAdd: (project: ProjectSchedule) => void;
  existingProjects: ProjectSchedule[];
}


function ScheduleForm({ onAdd, existingProjects }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState<ScheduleType>('none');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [days, setDays] = useState<number[]>([]);
  const { t } = useTranslation();
  const alerts = createAlert(t);

  const dayNames = [
    t('days.0'),
    t('days.1'),
    t('days.2'),
    t('days.3'),
    t('days.4'),
    t('days.5'),
    t('days.6'),
  ];

  const toggleDay = (day: number) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as ScheduleType);
    setStart('');
    setEnd('');
    setDays([]);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alerts.missingName();
      return;
    }

    if (type !== 'none' && (!start || !end)) {
      alerts.missingTime();
      return;
    }

    if (type === 'specificDays' && days.length === 0) {
      alerts.missingDays();
      return;
    }
    
    if ((type === 'daily' || type ==='specificDays') && (start >= end)) {
      alerts.invalidTimeRange();
      return;
    }

    const nameExists = existingProjects.some(
      (project) => project.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (nameExists) {
      alerts.duplicateName();
      return;
    }

    const schedule: Schedule = { type };
    if (type !== 'none') {
      schedule.timeRange = { start, end };
    }
    if (type === 'specificDays') {
      schedule.daysOfWeek = days;
    }
    if (isOverlapping(schedule, existingProjects)) {
      alerts.timeConflict(); 
      return;
    }

    const newProject: ProjectSchedule = {
      projectId: Date.now().toString(),
      name,
      schedule,
    };

    onAdd(newProject);
    alerts.addedPresentation();

    // reset form
    setName('');
    setType('none');
    setStart('');
    setEnd('');
    setDays([]);
  };

  return (
    <Box sx={{ mt: 4}}>
      <Paper sx={{ p: 2, mb: 4 }} elevation={3}>

      <Typography variant="h5" gutterBottom>
        {t('schedule.add')}
      </Typography>

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="schedule-type-label">{t('schedule.mode')}</InputLabel>
        <Select
          labelId="schedule-type-label"
          value={type}
          label="Presentation mode"
          onChange={handleTypeChange}
        >
          <MenuItem value="none">{t('schedule.no_plan')}</MenuItem>
          <MenuItem value="daily">{t('schedule.daily')}</MenuItem>
          <MenuItem value="specificDays">{t('schedule.days')}</MenuItem>
        </Select>
      </FormControl>

      {type !== 'none' && (
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <TextField
            label="Begin"
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            fullWidth
          />
          <TextField
            label="End"
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            fullWidth
          />
        </Box>
      )}

      {type === 'specificDays' && (
        <FormGroup row sx={{ mt: 2}}>
          {dayNames.map((day, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={days.includes(idx)}
                  onChange={() => toggleDay(idx)}
                />
              }
              label={day}
            />
          ))}
        </FormGroup>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        {t('schedule.add')}
      </Button>
      </Paper>
    </Box>
  );
}

export default ScheduleForm;
