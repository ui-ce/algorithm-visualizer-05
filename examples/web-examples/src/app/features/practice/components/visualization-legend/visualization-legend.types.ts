export interface LegendItem {
  label: string;
  // Name of a CSS custom property already defined in the color tokens
  // (e.g. 'viz-comparing'), not a raw color value — the legend square
  // reads its color from the same token the bars themselves use, so the
  // two never drift apart.
  colorToken: string;
}
