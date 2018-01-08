export default (color, opacity) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const a = opacity;
  return {
    r, g, b, a,
    rgba: `rgba(${r}, ${g}, ${b}, ${a})`
  };
};