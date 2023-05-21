export function openWindow(url: string, callback?: () => void) {
  let timer: NodeJS.Timeout | null = null;
  const windowProps = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=500, height=600`;
  const newWindow = window.open(url, "_blank", windowProps);

  if (newWindow) {
    // timer = setInterval(() => {
    //   if (newWindow.closed) {
    //     callback?.();
    //     if (timer) clearInterval(timer);
    //   }
    // }, 500);
    newWindow.addEventListener("message", (event: Event) => {
      // Send a message to the opened window
      console.log("sent the message");
      
      newWindow.postMessage("Hello, world!", url);
    });
  }
}
