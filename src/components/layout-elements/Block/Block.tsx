import React from "react";

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Block = React.forwardRef<HTMLDivElement, BlockProps>((props, ref) => {
  const { children, className, ...other } = props;
  return (
    <div ref={ref} className={className} {...other}>
      {children}
    </div>
  );
});

export default Block;
