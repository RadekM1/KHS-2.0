"use client";

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const SpinnerSmallWhite = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginX: 1,
      }}
    >
      <CircularProgress size={20} sx={{ color: "white" }} />
    </Box>
  );
};
