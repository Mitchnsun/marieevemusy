type PageSurfaceProps = {
  children: React.ReactNode;
};

/**
 * Wraps everything below the Hero in an opaque, stacked surface. The hero's image sits behind it
 * as a `position: fixed` backdrop (see `components/HeroBackdrop.tsx`), so this wrapper needs its
 * own stacking context (`relative z-10`) to actually paint over that backdrop instead of under it.
 */
export default function PageSurface({ children }: PageSurfaceProps) {
  return (
    <div data-component="PageSurface" className="bg-brand-gray-50 relative z-10">
      {children}
    </div>
  );
}
