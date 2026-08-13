export interface BreadcrumbItem {
  label: string;
  // Empty string marks the current page — it renders as plain text
  // instead of a link.
  route: string;
}
