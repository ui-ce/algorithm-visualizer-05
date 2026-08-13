// Primary, Outline and Navigation share the same layout (icon-text-icon,
// same padding, same border-radius) and only differ in color tokens and
// typography weight, so they're handled by one component with a variant
// switch. Selective and Play/Pause have different enough internals
// (a selection circle instead of icons, persistent selected state, fixed
// circular shape) that they live in their own components instead of
// being folded into this union.
export type ButtonVariant = 'primary' | 'outline' | 'navigation';
