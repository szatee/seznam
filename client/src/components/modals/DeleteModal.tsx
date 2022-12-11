import { memo, useCallback } from 'react';
import { Button, Grid, Modal, Typography } from '@mui/material';
import { ModalWrapper } from './ModalWrapper';

export const DeleteModal = memo(
  ({
    open,
    onSubmit,
    onClose,
    text,
  }: {
    open: boolean;
    onSubmit: any;
    onClose: () => void;
    text?: string;
  }) => {
    const handleSubmit = useCallback(() => {
      onSubmit();
      onClose();
    }, [onClose, onSubmit]);

    return (
      <Modal open={open} onClose={onClose}>
        <ModalWrapper>
          <Grid container direction="column" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Jste si jistí?</Typography>
            </Grid>
            <Grid item>
              Odstranit {text ?? 'položku'}? Tento krok nelze vrátit zpět!
            </Grid>
            <Grid container item justifyContent="space-between">
              <Grid item>
                <Button variant="contained" onClick={handleSubmit}>
                  Áno
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="secondary" onClick={onClose}>
                  Zrušiť
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </ModalWrapper>
      </Modal>
    );
  },
);
