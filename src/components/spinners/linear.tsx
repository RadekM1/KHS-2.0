import * as React from "react";
import Stack from "@mui/material/Stack";
import { LinearProgress } from "@mui/material";

export const LinearProgressBar = () => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <LinearProgress
        sx={{
          height: 4,
          "& .MuiLinearProgress-bar": {
            backgroundColor: "orange",
          },
          backgroundColor: "#ffe0b2",
        }}
      />
    </Stack>
  );
};
