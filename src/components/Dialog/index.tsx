import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

export type DialogState = { isLoading: boolean, setSubmitLoad: (newState: boolean) => void }
type AlertDialogProps = {
    children: (dialogState: DialogState) => React.ReactElement<null>,
    open: boolean,
    setClose: () => void,
    title?: string,
    formKey?: string,
    onSave?: () => void
}
export default function AlertDialog(props: AlertDialogProps) {
    const { open, setClose, onSave } = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {

    }, [isLoading])

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                maxWidth={"sm"}
                fullWidth={true}
                sx={{
                    margin: theme => theme.spacing(2),
                }}
                open={open}
                onClose={setClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title ?? "Dialog"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <props.children isLoading={isLoading} setSubmitLoad={setLoading} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={setClose}>Cancle</Button>
                    <Button
                        type="submit"
                        {...(props.formKey ? { form: props.formKey } : { onClick: onSave })}
                        autoFocus>
                        Save
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}