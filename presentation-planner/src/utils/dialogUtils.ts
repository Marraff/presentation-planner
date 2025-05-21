
export interface ConfirmDialogOptions {
  title?: string;
  itemName?: string
  onConfirm: () => void;
  onCancel?: () => void;
}

export const dialogs = (t: any) => ({
  confirmDelete:(
                onConfirm: () => void, 
                onCancel?: () => void,
                itemName?: string):
                ConfirmDialogOptions => ({
                    title: t('dialog.title'),
                    itemName,
                    onConfirm,
                    onCancel,
                }),

});
