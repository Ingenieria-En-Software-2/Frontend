import Alert from "@material-ui/lab/Alert";

function SuccessAlert(message: string) {
  return (
    <Alert variant="outlined" severity="success">
      {message}
    </Alert>
  );
}

function InfoAlert(message: string) {
  return (
    <Alert variant="outlined" severity="info">
      {message}
    </Alert>
  );
}

function WarningAlert(message: string) {
  return (
    <Alert variant="outlined" severity="warning">
      {message}
    </Alert>
  );
}

function ErrorAlert(message: string) {
  return (
    <Alert variant="outlined" severity="error">
      {message}
    </Alert>
  );
}

export { SuccessAlert, InfoAlert, WarningAlert, ErrorAlert };
