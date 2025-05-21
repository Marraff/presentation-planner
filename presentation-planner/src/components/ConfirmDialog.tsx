import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { ConfirmDialogOptions } from '../utils/dialogUtils';
import { useTranslation } from 'react-i18next';

export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  itemName?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

function ConfirmDialog({ open, title, itemName, onConfirm, onCancel }: ConfirmDialogProps) {
  const { t } = useTranslation();
  
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="confirm-dialog-title">
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText style={{textAlign: 'center'}}> {itemName} </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {t('dialog.cancel')}
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          {t('dialog.delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { ConfirmDialog };
