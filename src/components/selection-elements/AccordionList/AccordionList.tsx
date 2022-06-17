import React from 'react';

export interface AccordionListProps {
    children: React.ReactElement[],
}

const AccordionList = ({
    children,
}: AccordionListProps) => {
    const numChildren = React.Children.count(children);
    return (
        // <div className="shadow rounded-lg">
        // @Achi: Shadow param here
        <div className="rounded-lg">
            { React.Children.map(children, (child, idx) => {
                console.log(child.props.className);
                if (idx === 0) {
                    return (
                        <>
                            { React.cloneElement(child, {
                                borderClassNames: `border-t border-l border-r border-b
                                                   rounded-t-lg`
                            }) }
                        </>
                    );
                }
                if (idx === numChildren - 1) {
                    return (
                        <>
                            { React.cloneElement(child, { borderClassNames: `border-b border-l border-r 
                                                                             rounded-b-lg` }) }
                        </>
                    );
                }
                return (
                    <>
                        { React.cloneElement(child, { borderClassNames: `border-b border-l border-r` }) }
                    </>
                );
            })}
        </div>
    );
};

export default AccordionList;
