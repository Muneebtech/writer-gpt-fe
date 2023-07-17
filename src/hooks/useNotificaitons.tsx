import { useState, useEffect } from "react";
import { Alert, AlertColor, Slide, SlideProps, Snackbar } from "@mui/material";
type NotificationProps = {
  message: string;
  duration: number;
  type: AlertColor;
};
const useNotification = ({
  message,
  duration = 3000,
  type = "success",
}: NotificationProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);

    const timer = setTimeout(() => {
      setOpen(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);
  const SlideTransition = (props: SlideProps) => {
    return <Slide {...props} direction="left" />;
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => setOpen(false)}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert elevation={6} variant="filled" severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default useNotification;
