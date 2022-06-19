import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

export interface AccordionHeaderProps {
    isExpanded?: boolean,
    setExpanded?: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode;
}

const AccordionHeaderSmall = ({
    isExpanded,
    setExpanded,
    children
}: AccordionHeaderProps) => {
    return(
        <div className="w-full flex items-center justify-between text-sm px-3 py-2">
            <div className="w-[95%]">
                { children }
            </div>
            <button 
                className="w-10 flex justify-end"
                onClick={ () => setExpanded!(!isExpanded) }>
                { isExpanded
                    ? <ChevronUpIcon className="text-gray-400 h-5 w-5" aria-hidden="true" />
                    : <ChevronDownIcon className="text-gray-400 h-5 w-5" aria-hidden="true" /> }
            </button>
        </div>
    );
};

export default AccordionHeaderSmall;
