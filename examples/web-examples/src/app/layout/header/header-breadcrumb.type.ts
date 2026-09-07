export interface BreadcrumbItem {
  label: string;
  // Empty string marks the current page — it renders as plain text
  // instead of a link.
  route: string;
  // Optional: scrolls to this element id after navigating to `route`.
  // Used by the "Algorithms" breadcrumb item, which points at Landing's
  // algorithm-picker section rather than its own page.
  fragment?: string;
}