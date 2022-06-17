import React from 'react';

export interface AccordionListSmallProps {
    children: React.ReactElement[],
}

const AccordionListSmall = ({
    children,
}: AccordionListSmallProps) => {
    const numChildren = React.Children.count(children);
    return (
        // @Achi: Shadow param in div below
        <div className="">
            { React.Children.map(children, (child, idx) => {
                console.log(child.props.className);
                if (idx === 0) {
                    return (
                        <>
                            {/* Border light version: */}
                            {/* { React.cloneElement(child, {
                                borderClassNames: `border-t border-b`
                            }) } */}
                            
                            { React.cloneElement(child, {
                                borderClassNames: `border-t border-l border-r border-b
                                                   rounded-t-md`
                            }) }
                        </>
                    );
                }
                if (idx === numChildren - 1) {
                    return (
                        <>
                            {/* Border light version: */}
                            {/* { React.cloneElement(child, { borderClassNames: `border-b` }) } */}

                            { React.cloneElement(child, { borderClassNames: `border-b border-l border-r 
                                                                             rounded-b-md` }) }
                        </>
                    );
                }
                return (
                    <>
                        {/* Border light version: */}
                        {/* { React.cloneElement(child, { borderClassNames: `border-b` }) } */}

                        { React.cloneElement(child, { borderClassNames: `border-b border-l border-r` }) }
                    </>
                );
            })}
        </div>
    );
};

export default AccordionListSmall;
