import React, { FC, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  TableContainer,
  Table,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@material-ui/core';
import { Delete, PlaylistAdd, Done } from '@material-ui/icons';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export interface CycleType {
  time: number;
  type: string;
  msg: string;
}

export interface SettingProps {
  open: boolean;
  onClose: () => void;
  cycle: CycleType[];
  submit: (cycle: CycleType[]) => void;
  onReset: (cycleList: CycleType[]) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    timeTextField: {
      width: '3em',
    },
    typeTextField: {
      width: '6em',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '7em',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    cell: {
      padding: '1px',
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
        time: parseInt(data.time, 10) * 60,
        type: data.type,
        msg: data.msg,
      }),
    );
    submit(list);
    onReset(list);
    onClose();
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="setting-dialog" open={open}>
      <DialogTitle>Preferences</DialogTitle>
      <DialogContentText>サイクルの設定を行えます。</DialogContentText>
      <DialogActions>
        <Button
          onClick={() => prepend({})}
          variant="outlined"
          startIcon={<PlaylistAdd />}
        >
          prepend
        </Button>
      </DialogActions>
      <DialogContent>
        <form className={classes.root}>
          <TableContainer component={Paper}>
            <Table aria-label="setting-cycle">
              <TableBody>
                {fields.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell
                      align="center"
                      scope="row"
                      className={classes.cell}
                    >
                      <IconButton
                        onClick={() => remove(index)}
                        aria-label="delete"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>

                    <TableCell
                      align="right"
                      scope="row"
                      className={classes.cell}
                    >
                      <TextField
                        name={`test[${index}].time`}
                        label="time(min)"
                        type="number"
                        defaultValue={item.time && item.time / 60}
                        inputRef={register({
                          required: '必須',
                          min: {
                            value: 1,
                            message: '１以上を入力してください。',
                          },
                        })}
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
                          errors.test[index].time.message
                        }
                        className={classes.timeTextField}
                      />
                    </TableCell>

                    <TableCell
                      align="right"
                      scope="row"
                      className={classes.cell}
                    >
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
                            </Select>
                          }
                          name={`test[${index}].type`}
                          rules={{ required: 'this is required!' }}
                          control={control}
                          defaultValue={item.type ? item.type : ''}
                          className={classes.typeTextField}
                        />
                        <FormHelperText>
                          {errors.test &&
                            errors.test[index] &&
                            errors.test[index].type &&
                            errors.test[index].type.message}
                        </FormHelperText>
                      </FormControl>
                    </TableCell>

                    <TableCell
                      align="right"
                      scope="row"
                      className={classes.cell}
                    >
                      <TextField
                        inputRef={register({ required: true })}
                        label="msg"
                        name={`test[${index}].msg`}
                        defaultValue={item.msg}
                        error={Boolean(
                          errors.test &&
                            errors.test[index] &&
                            errors.test[index].msg,
                        )}
                        helperText={
                          errors.test &&
                          errors.test[index] &&
                          errors.test[index].msg &&
                          'This field is required'
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => append({})}
          variant="outlined"
          startIcon={<PlaylistAdd />}
        >
          append
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="outlined"
          startIcon={<Done />}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingComponent;
