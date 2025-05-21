import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: 'en' | 'sk') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Change language">
        <IconButton onClick={handleClick} color="inherit">
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => changeLanguage('en')}>{t('global.en')}</MenuItem>
        <MenuItem onClick={() => changeLanguage('sk')}>{t('global.sk')}</MenuItem>
      </Menu>
    </>
  );
};
