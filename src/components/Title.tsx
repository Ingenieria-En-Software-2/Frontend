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
        mt: 3,
        mb: 1,
        height: "50px",
        borderRadius: "5px",
        fontWeight: "bold",
        fontSize: "1.6rem",
        backgroundColor: "#0e7490",
        color: "#fff",
      }}
    >
      <Box>{title}</Box>
    </Grid>
  );
}
