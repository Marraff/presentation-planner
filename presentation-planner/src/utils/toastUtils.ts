import { toast } from 'react-toastify';

export const showError = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  });
};

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  });
};

export const createAlert = (t: any) => ({
  
    missingName: () => showError(t('alerts.missingName')),
    missingTime: () => showError(t('alerts.missingTime')),
    missingDays: () => showError(t('alerts.missingDays')),
    addedPresentation: () => showSuccess(t('alerts.addedPresentation')),
    duplicateName: () => showError(t('alerts.duplicateName')),
    deletePresentation: () => showSuccess(t('alerts.deletePresentation')),
    timeConflict: () => showError(t('alerts.timeConflict')),
    invalidTimeRange: () => showError(t('alerts.invalidTimeRange')),
});
