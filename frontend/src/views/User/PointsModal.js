import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function PointsModal({
  open,
  onClose,
  userId,
  isAdding,
  handleAddPoints,
  handleDeductPoints,
}) {
  const [points, setPoints] = useState("");

  const handleSubmit = () => {
    const pointsValue = parseInt(points, 10);
    if (isAdding) {
      handleAddPoints(userId, pointsValue);
    } else {
      handleDeductPoints(userId, pointsValue);
    }
    setPoints("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isAdding ? "Add Points" : "Deduct Points"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the number of points to {isAdding ? "add" : "deduct"} for
          the user.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="points"
          label="Points"
          type="number"
          fullWidth
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PointsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.number,
  isAdding: PropTypes.bool.isRequired,
  handleAddPoints: PropTypes.func.isRequired,
  handleDeductPoints: PropTypes.func.isRequired,
};

export default PointsModal;
