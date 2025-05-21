import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Pagination } from 'react-bootstrap';
import { ProjectSchedule } from '../types';
import { ProjectTable } from './ProjectTable';
import { getCurrentlyPlayingProject } from '../utils/currentProject';
import { useTranslation } from 'react-i18next';

interface Props {
  projects: ProjectSchedule[];
  onDelete: (projectId: string, name: string) => void;
}

const ITEMS_PER_PAGE = 3;

function ProjectOverview({ projects, onDelete }: Props) {

  const [currentPage, setCurrentPage] = useState(1);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<ProjectSchedule | null>(null);
  const pageCount = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = projects.slice(offset, offset + ITEMS_PER_PAGE);
  const { t } = useTranslation();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {

    setCurrentlyPlaying(getCurrentlyPlayingProject(projects));

    const interval = setInterval(() => {
        setCurrentlyPlaying(getCurrentlyPlayingProject(projects));
    }, 60 * 1000);

  return () => clearInterval(interval);
}, [projects]);

  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          {t("table.current_presentation")}
        </Typography>
            {currentlyPlaying ? (
            <Typography>{currentlyPlaying.name}: {currentlyPlaying.schedule.timeRange?.start} - {currentlyPlaying.schedule.timeRange?.end}</Typography>
        ) : (
            <Typography color="text.secondary">{t("table.no_presentation")}</Typography>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb:4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          {t("table.presentation_list")}
        </Typography>

        {projects.length === 0 ? (
          <Typography color="text.secondary">{t("table.no_available")}</Typography>
        ) : (
          <>
            <ProjectTable projects={paginatedProjects} onDelete={onDelete} />

            <Pagination className="justify-content-center mt-3">
              {[...Array(pageCount)].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </>
        )}
      </Paper>
    </Box>
  );
}

export { ProjectOverview };
