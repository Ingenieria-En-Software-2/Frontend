import Alert from "@mui/material/Alert";

type Props = {
  message: string;
};

function SuccessAlert({ message }: Props) {
  return (
    <Alert variant="outlined" severity="success">
      {message}
    </Alert>
  );
}

function InfoAlert({ message }: Props) {
  return (
    <Alert variant="outlined" severity="info" sx={{ my: 2 }}>
      {message}
    </Alert>
  );
}

function WarningAlert({ message }: Props) {
  return (
    <Alert variant="outlined" severity="warning">
      {message}
    </Alert>
  );
}

function ErrorAlert({ message }: Props) {
  return (
    <Alert variant="outlined" severity="error">
      {message}
    </Alert>
  );
}

export { SuccessAlert, InfoAlert, WarningAlert, ErrorAlert };
