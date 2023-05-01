interface BaseAnimationTimingProps extends React.HTMLAttributes<HTMLDivElement> {
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  animationBegin?: number;
  animationDuration?: number;
  animationEasing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  showAnimation?: boolean;
}

export default BaseAnimationTimingProps;
