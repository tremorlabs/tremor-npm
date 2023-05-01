interface BaseAnimatedProps extends React.HTMLAttributes<HTMLDivElement> {
  animationBegin?: number;
  animationDuration?: number;
  animationEasing?: "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";
  showAnimation?: boolean;
}

export default BaseAnimatedProps;
