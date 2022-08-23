import { Check, Delete, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import Service from "../../service/useAPI/Service";

const Actions = ({ params, rowId, setRowId, setModal, setId, apiData }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const service = new Service();

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(async () => {
      var Asset = new Object();

      Asset.label = params.row.Label;
      Asset.shares = parseFloat(params.row.shares);
      Asset.initialPrice = parseFloat(params.row.initialPrice);

      const result = service.put("assets", params.row.Label, Asset);

      if (result) {
        setSuccess(true);
        setRowId(null);
      }

      setLoading(false);
    }, 1500);
  };

  const handleDeleteClick = (id) => () => {
    setLoading(true);
    setModal((prev) => !prev);
    setId(apiData.filter((row) => row.label === id)[0].id);
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <>
          <Fab
            color="primary"
            sx={{
              mx: 1,
              width: 40,
              height: 40,
              bgcolor: green[500],
              "&:hover": { bgcolor: green[700] },
            }}
          >
            <Check />
          </Fab>
          <Fab
            color="red"
            sx={{
              mx: 1,
              width: 40,
              height: 40,
            }}
            onClick={handleDeleteClick(params.id)}
          >
            <Delete />
          </Fab>
        </>
      ) : (
        <>
          <Fab
            color="primary"
            sx={{
              mx: 1,
              width: 40,
              height: 40,
            }}
            disabled={params.id !== rowId || loading}
            onClick={handleSubmit}
          >
            <Save />
          </Fab>
          <Fab
            color="red"
            sx={{
              mx: 1,
              width: 40,
              height: 40,
            }}
            onClick={handleDeleteClick(params.id)}
          >
            <Delete />
          </Fab>
        </>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: 2,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default Actions;
