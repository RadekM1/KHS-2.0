import * as React from "react";
import Stack from "@mui/material/Stack";
import { LinearProgress } from "@mui/material";

export const LinearProgressBar = () => {
  return (
    <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
      <LinearProgress color="inherit" />
    </Stack>
  );
};
