export default interface ValidationError {
  code: string;
  message: string | { text: string; variables: { [key: string]: any } };
  field: string;
}
