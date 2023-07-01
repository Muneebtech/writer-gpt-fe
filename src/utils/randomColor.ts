export function generateRandomColors() {
  const hue = Math.floor(Math.random() * 360); // Random hue value between 0 and 359
  const saturation = Math.floor(Math.random() * 21) + 80; // Random saturation value between 80 and 100
  const lightness = Math.floor(Math.random() * 11) + 80; // Random lightness value between 70 and 90

  const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const textColor = `hsl(${hue}, ${saturation}%, ${lightness - 35}%)`; // Darker shade for text

  return { backgroundColor, textColor };
}
