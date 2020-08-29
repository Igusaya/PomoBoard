import React, { FC, useEffect } from 'react';
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
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export interface SettingProps {
  open: boolean;
  onClose: () => void;
  cycle: { time: number; type: string; msg: string }[];
  submit: (cycle: { time: number; type: string; msg: string }[]) => void;
  onReset: (cycleList: { time: number; type: string; msg: string }[]) => void;
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

const SettingComponent: FC<SettingProps> = (props: SettingProps) => {
  const { onClose, open, cycle, submit, onReset } = props;
  const { register, handleSubmit, control, errors, reset } = useForm({});
  const classes = useStyles();

  const { fields, append, prepend, remove } = useFieldArray({
    control,
    name: 'test',
  });

  useEffect(() => {
    // 初期値の設定
    reset({
      test: cycle,
    });
  }, [cycle, reset]);

  const onSubmit = (datas: any) => {
    const list = datas.test.map(
      (data: { time: string; type: string; msg: string }) => ({
        time: parseInt(data.time, 10),
        type: data.type,
        msg: data.msg,
      }),
    );
    submit(list);
    onReset(list);
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
        <DialogContentText>
          サイクルの設定を行えます。(未実装)
        </DialogContentText>

        <form className={classes.root}>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id}>
                <TextField
                  name={`test[${index}].time`}
                  label="time(min)"
                  type="number"
                  defaultValue={item.time}
                  inputRef={register({ required: true })}
                  error={Boolean(
                    errors &&
                      errors.test &&
                      errors.test[index] &&
                      errors.test[index].time,
                  )}
                  helperText={
                    errors.test &&
                    errors.test[index] &&
                    errors.test[index].time &&
                    'This field is required'
                  }
                  className={classes.textField}
                />

                <FormControl
                  className={classes.formControl}
                  error={Boolean(
                    errors.test &&
                      errors.test[index] &&
                      errors.test[index].type,
                  )}
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
                    name={`test[${index}].type`}
                    rules={{ required: 'this is required!' }}
                    control={control}
                    defaultValue={item.type ? item.type : ''}
                  />
                  <FormHelperText>
                    {errors.test &&
                      errors.test[index] &&
                      errors.test[index].type &&
                      errors.test[index].type.message}
                  </FormHelperText>
                </FormControl>

                <TextField
                  inputRef={register({ required: true })}
                  label="msg"
                  name={`test[${index}].msg`}
                  defaultValue={item.msg}
                  fullWidth
                  error={Boolean(
                    errors.test && errors.test[index] && errors.test[index].msg,
                  )}
                  helperText={
                    errors.test &&
                    errors.test[index] &&
                    errors.test[index].msg &&
                    'This field is required'
                  }
                />

                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <Button onClick={() => append({})} variant="contained">
            append
          </Button>
          <Button onClick={() => prepend({})} variant="contained">
            prepend
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SettingComponent;
