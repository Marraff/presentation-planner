import React from 'react';
import { Table } from 'react-bootstrap';
import { ProjectSchedule, Schedule } from '../types';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

interface Props {
  projects: ProjectSchedule[];
  onDelete: (projectId: string, name: string) => void;
}

const getScheduleName = (schedule: Schedule, t: any): string => {

  const dayNames = [
    t('days.0'),
    t('days.1'),
    t('days.2'),
    t('days.3'),
    t('days.4'),
    t('days.5'),
    t('days.6'),
  ];

  if (schedule.type === 'none') 
    return t('schedule.nonstop');

  if (schedule.type === 'daily')
    return t('schedule.daily')+": "+ schedule.timeRange?.start +" - "+ schedule.timeRange?.end;

  if (schedule.type === 'specificDays') {
    const days = schedule.daysOfWeek?.map((d) => dayNames[d]).join(', ') ?? '';
    return days+": "+ schedule.timeRange?.start +" - "+schedule.timeRange?.end;
  }

  return '';
};

const ProjectTable = ({ projects, onDelete }: Props) => {
  const { t } = useTranslation();

  return (
    <Table striped bordered hover responsive>
      <thead className="table-dark">
        <tr>
          <th></th>
          <th>{t('table.name')}</th>
          <th>{t('table.schedule')}</th>
          <th>{t('table.actions')}</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((p, index) => (
          <tr key={p.projectId}>
            <td>{index + 1}</td>
            <td>{p.name}</td>
            <td>{getScheduleName(p.schedule, t)}</td>
            <td>
              <IconButton
                edge="end"
                onClick={() => onDelete(p.projectId, p.name)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export { ProjectTable };
