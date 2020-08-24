import React, { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export interface SettingProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    textField: {
      width: '15%',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

type Inputs = {
  time: number;
  type: string;
  msg: string;
};

const SettingComponent: FC<SettingProps> = (props: SettingProps) => {
  const { onClose, open } = props;
  const methods = useForm<Inputs>();
  const { register, handleSubmit, control, errors } = methods;
  const classes = useStyles();

  const onSubmit = (data: Inputs) => {
    return console.log(data);
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>Preferences</DialogTitle>
      <DialogContent>
        <DialogContentText>サイクルの設定を行えます。</DialogContentText>

        <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="time"
            label="time(min)"
            type="number"
            inputRef={register({ required: true })}
            error={!!errors.time}
            helperText={errors.time && 'This field is required'}
            className={classes.textField}
          />

          <FormControl
            className={classes.formControl}
            error={Boolean(errors.type)}
          >
            <InputLabel id="type-select">Type</InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value="WORK">WORK</MenuItem>
                  <MenuItem value="BREAK">BREAK</MenuItem>
                  <MenuItem value="REST">REST</MenuItem>
                  <MenuItem value="BUFFER_REST">BUFFER_REST</MenuItem>
                </Select>
              }
              name="type"
              rules={{ required: 'this is required!' }}
              control={control}
              defaultValue=""
            />
            <FormHelperText>
              {errors.type && errors.type.message}
            </FormHelperText>
          </FormControl>

          <TextField
            inputRef={register({ required: true })}
            label="msg"
            name="msg"
            fullWidth
            error={!!errors.msg}
            helperText={errors.msg && 'This field is required'}
          />
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SettingComponent;
