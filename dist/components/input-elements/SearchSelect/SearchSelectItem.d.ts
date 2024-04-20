import React from "react";
export interface SearchSelectItemProps extends React.HTMLAttributes<HTMLLIElement> {
    value: string;
    icon?: React.ElementType;
}
declare const SearchSelectItem: React.ForwardRefExoticComponent<SearchSelectItemProps & React.RefAttributes<HTMLLIElement>>;
export default SearchSelectItem;
