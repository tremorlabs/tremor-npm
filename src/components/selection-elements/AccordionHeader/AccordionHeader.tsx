import React from 'react';
import ArrowDownSLineIcon from 'remixicon-react/ArrowDownSLineIcon';
import ArrowRightSLineIcon from 'remixicon-react/ArrowRightSLineIcon';

export interface AccordionHeaderProps {
    isExpanded?: boolean,
    setExpanded?: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode;
}

const AccordionHeader = ({
    isExpanded,
    setExpanded,
    children
}: AccordionHeaderProps) => {
    return(
        <div className="w-full flex items-center justify-between px-3 py-3">
            <div className="w-[95%]">
                { children }
            </div>
            <button 
                className="w-10 flex justify-end"
                onClick={ () => setExpanded!(!isExpanded) }>
                { isExpanded
                    ? <ArrowDownSLineIcon className="text-gray-400 h-6 w-6" />
                    : <ArrowRightSLineIcon className="text-gray-400 h-6 w-6" /> }
            </button>
        </div>
    );
};

export default AccordionHeader;
