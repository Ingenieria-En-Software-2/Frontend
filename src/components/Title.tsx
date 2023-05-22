import { Grid, Box } from "@mui/material";

/**
 * Title component
 * @description This component is used to display a title.
 * @param {string} title The title of the table.
 * @returns {Grid} The Title component
 */
export default function Title({ title }: { title: string }) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        mb: 1,
        height: "50px",
        borderRadius: "5px",
        fontWeight: "bold",
        fontSize: "1.5rem",
        backgroundColor: "#3f51b5",
        color: "#fff",
      }}
    >
      <Box>{title}</Box>
    </Grid>
  );
}
