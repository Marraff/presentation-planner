import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ProjectSchedule } from './types';
import ScheduleForm from './components/ScheduleForm';
import { ProjectOverview } from './components/ProjectOverview';
import { createAlert } from './utils/toastUtils';
import { dialogs } from './utils/dialogUtils';
import { ConfirmDialog } from './components/ConfirmDialog';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './components/LanguageSwitcher';


export const App = () => {

  const [projects, setProjects] = useState<ProjectSchedule[]>([]);
  const [currentProject, setCurrentProject] = useState<ProjectSchedule | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { t } = useTranslation();
  const alerts = createAlert(t);


  const addProject = (project: ProjectSchedule) => {
    setProjects((prev) => [...prev, project]);
  };

  const handleDeleteClick = (projectId: string, name: string) => {
    setSelectedProjectId(projectId);
    setItemName(name);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProjectId)
      return;

    setProjects((prev) => {
      return prev.filter(p => p.projectId !== selectedProjectId);
    });
    alerts.deletePresentation();
    setDialogOpen(false);
    setSelectedProjectId(null);
    setItemName('');

  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setSelectedProjectId(null);
    setItemName('');

  };

  const options = dialogs(t).confirmDelete(handleConfirmDelete, handleCancelDelete, itemName);


  return (
    <>
    <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
        <LanguageSwitcher />
      </header>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" sx={{ mt: 4, mb: 4 }}>
          {t('global.name')}
        </Typography>

        <ScheduleForm onAdd={addProject} existingProjects={projects} />
        <ProjectOverview
          projects={projects}
          onDelete={(projectId, name) => handleDeleteClick(projectId, name)}
        />
      </Container>

      <ConfirmDialog
        open={dialogOpen}
        {...options}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
