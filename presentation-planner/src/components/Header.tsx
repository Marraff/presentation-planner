import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

type HeaderProps = {
  setActivePage: (page: string) => void;
};

function Header({ setActivePage }: HeaderProps) {    
    const { t } = useTranslation();

    return (
        <header>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => setActivePage('planner')}>
                        {t('global.presentation')}
                    </Button>
                    <Button color="inherit" onClick={() => setActivePage('round')}>
                        {t('global.round')}
                    </Button>
                    <div style={{ flexGrow: 1 }} />
                    <LanguageSwitcher />
                </Toolbar>
            </AppBar>
        </header>
    );
};

export default Header;
