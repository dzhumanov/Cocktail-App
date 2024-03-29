import { Button, Grid, Typography } from "@mui/material";

interface Props {
  isPublished?: boolean;
  onDelete: () => void;
}

const InterfaceInfoUser: React.FC<Props> = ({ isPublished, onDelete }) => {
  return (
    <Grid item container>
      <Typography variant="h5">
        Status:{" "}
        <span style={{ color: isPublished ? "green" : "red" }}>
          {isPublished ? "Published" : "Not published"}
        </span>
      </Typography>
      <Button
        onClick={onDelete}
        color="primary"
        variant="contained"
        sx={{
          mr: "20px",
          fontSize: "32px",
          bgcolor: "red",
          color: "#fff",
          width: "200px",
          "&:hover": {
            bgcolor: "#fff",
            color: "#000",
          },
          "&:active": {
            bgcolor: "#000",
            color: "#fff",
          },
        }}
      >
        Delete
      </Button>
    </Grid>
  );
};

export default InterfaceInfoUser;
