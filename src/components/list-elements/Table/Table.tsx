import React, { useEffect, useState } from "react";

import { Color, makeClassName, tremorTwMerge } from "lib";

import {
  ArrowLeftHeadIcon,
  ArrowRightHeadIcon,
  DoubleArrowLeftHeadIcon,
  DoubleArrowRightHeadIcon,
} from "assets";
import { Button, TextInput } from "components/input-elements";
import { Badge, Icon } from "components/icon-elements";
import { Flex } from "components/layout-elements";

type PaginationConfig = {
  pageSize: number;
  variant?: "only_arrows" | "with_input" | "with_buttons";
  visibleButtons?: number;
  allowEndStartButtons?: boolean;
  color?: Color;
};

const makeTableClassName = makeClassName("Table");

const useTablePagination = (children: React.ReactNode, pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rows = React.Children.toArray(children);

  const rowsPerPage = pageSize <= 0 ? 0 : pageSize;
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const filteredRows = rows.slice(startIndex, endIndex);

  const totalPages = rowsPerPage !== 0 ? Math.ceil(rows.length / rowsPerPage) : 0;
  if (filteredRows.length === 0 && currentPage !== 0) {
    setCurrentPage(0);
  }
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToFirstPage = () => {
    goToPage(0);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages - 1);
  };

  const goToPage = (page: number) => {
    let currPage = page;
    if (page < 0) {
      currPage = 0;
    }
    if (page >= totalPages) {
      currPage = totalPages - 1;
    }
    setCurrentPage(currPage);
  };
  return {
    currentPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
    goToFirstPage,
    goToLastPage,
    filteredRows,
    totalPages,
    isActive: Boolean(rowsPerPage),
  };
};

type TableControllerProps = {
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
  visibleButtons: number;
  config: PaginationConfig;
};

const TableController = ({
  goToNextPage,
  goToPrevPage,
  goToFirstPage,
  goToLastPage,
  goToPage,
  currentPage,
  totalPages,
  visibleButtons,
  config,
}: TableControllerProps) => {
  const [buttonsLimit, setButtonsLimit] = useState({ start: 0, end: visibleButtons });
  const [targetPage, setTargetPage] = useState(String(currentPage + 1));
  const [prevVisibleButtons, setPrevVisibleButtons] = useState(visibleButtons);

  useEffect(() => {
    setButtonsLimit((prevState) => {
      let nextState = prevState;
      if (visibleButtons > prevVisibleButtons) {
        nextState = {
          start: Math.min(currentPage, totalPages - visibleButtons),
          end: Math.min(currentPage + visibleButtons, totalPages),
        };
      }
      if (visibleButtons < prevVisibleButtons) {
        nextState = {
          start: Math.max(currentPage - (visibleButtons - 1), 0),
          end: Math.max(currentPage + 1, visibleButtons),
        };
      }
      return nextState;
    });
    setPrevVisibleButtons(visibleButtons);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleButtons]);

  useEffect(() => {
    if (config.variant === "with_input") {
      setTargetPage(String(currentPage + 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleGoToFirstPage = () => {
    setButtonsLimit({ start: 0, end: visibleButtons });
    goToFirstPage();
  };

  const handleGoToPrevPage = () => {
    const targetPage = currentPage - 1;
    if (targetPage === buttonsLimit.start - 1) {
      setButtonsLimit({
        start: Math.max(targetPage - (visibleButtons - 1), 0),
        end: Math.max(targetPage + 1, visibleButtons),
      });
    }
    goToPrevPage();
  };

  const handleGoToNextPage = () => {
    const targetPage = currentPage + 1;
    if (targetPage === buttonsLimit.end) {
      setButtonsLimit({
        start: Math.min(targetPage, totalPages - visibleButtons),
        end: Math.min(targetPage + visibleButtons, totalPages),
      });
    }
    goToNextPage();
  };

  const handleGoToLastPage = () => {
    const targetPage = totalPages - 1;
    setButtonsLimit({
      start: targetPage - (visibleButtons - 1),
      end: totalPages,
    });
    goToLastPage();
  };

  const handleTargetPageChange = (value: string) => {
    if (!value) {
      setTargetPage(value);
      return;
    }
    const page = Number(value.trim());
    if (isNaN(page)) {
      setTargetPage(String(currentPage + 1));
      return;
    }
    setTargetPage(value);
    goToPage(page - 1);
  };
  return (
    <Flex justifyContent="center" className="[&>button]:w-6 [&>button]:h-6 gap-x-1 mb-1">
      {config.allowEndStartButtons && (
        <Button
          color={config.color}
          className="focus:ring-0"
          variant="secondary"
          size="xs"
          onClick={handleGoToFirstPage}
          disabled={currentPage === 0}
        >
          <Icon color={config.color} icon={DoubleArrowLeftHeadIcon}></Icon>
        </Button>
      )}
      <Button
        color={config.color}
        className="focus:ring-0"
        variant="secondary"
        size="xs"
        onClick={handleGoToPrevPage}
        disabled={currentPage === 0}
      >
        <Icon color={config.color} icon={ArrowLeftHeadIcon}></Icon>
      </Button>
      {config.variant === "with_buttons" && (
        <Flex justifyContent="start" className="overflow-x-auto gap-x-0.5 w-auto">
          {new Array(totalPages)
            .fill(null)
            .map((_, idx) => idx)
            .slice(buttonsLimit.start, buttonsLimit.end)
            .map((page) => {
              return page === currentPage ? (
                <Badge color={config.color} key={page}>
                  {page + 1}
                </Badge>
              ) : (
                <Badge
                  onClick={() => goToPage(page)}
                  className="cursor-pointer hover:bg-neutral-300"
                  color="gray"
                  key={page}
                >
                  {page + 1}
                </Badge>
              );
            })}
        </Flex>
      )}
      {config.variant === "only_arrows" && <Badge color={config.color}>{currentPage + 1}</Badge>}
      {config.variant === "with_input" && (
        <TextInput
          className={tremorTwMerge("w-20 [&>input]:py-1", `ring-${config.color}-200`)}
          value={targetPage}
          onChange={(e) => handleTargetPageChange(e.target.value)}
        ></TextInput>
      )}
      <Button
        color={config.color}
        className="focus:ring-0"
        variant="secondary"
        size="xs"
        onClick={handleGoToNextPage}
        disabled={currentPage === totalPages - 1}
      >
        <Icon color={config.color} icon={ArrowRightHeadIcon}></Icon>
      </Button>
      {config.allowEndStartButtons && (
        <Button
          color={config.color}
          className="focus:ring-0"
          variant="secondary"
          size="xs"
          onClick={handleGoToLastPage}
          disabled={currentPage === totalPages - 1}
        >
          <Icon color={config.color} icon={DoubleArrowRightHeadIcon}></Icon>
        </Button>
      )}
    </Flex>
  );
};
const Table = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement> & {
    children: JSX.Element | JSX.Element[];
    paginationConfig?: PaginationConfig;
  }
>((props, ref) => {
  const { children, className, paginationConfig = { pageSize: 0 }, ...other } = props;
  const {
    pageSize,
    visibleButtons = 5,
    variant = "with_buttons",
    allowEndStartButtons = false,
    color,
  } = paginationConfig;

  const tableBody =
    ((Array.isArray(children) &&
      children.find((comp) => comp.type.displayName === "TableBody")) as JSX.Element) ||
    children ||
    null;

  const tableHead =
    (Array.isArray(children) && children.find((comp) => comp.type.displayName === "TableHead")) ||
    children ||
    null;

  const rows = tableBody?.props?.children || [];

  const {
    filteredRows,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage,
    currentPage,
    isActive,
    totalPages,
    goToPage,
  } = useTablePagination(rows, pageSize);

  const filteredBody = {
    ...tableBody,
    props: {
      ...tableBody?.props,
      children: filteredRows,
    },
  };
  return (
    <div className={tremorTwMerge(makeTableClassName("root"), "overflow-auto", className)}>
      <table
        ref={ref}
        className={tremorTwMerge(
          makeTableClassName("table"),
          // common
          "w-full tabular-nums text-tremor-default",
          // light
          "text-tremor-content",
          // dark
          "dark:text-dark-tremor-content",
        )}
        {...other}
      >
        {isActive ? (
          <>
            {tableHead}
            {filteredBody}
          </>
        ) : (
          children
        )}
      </table>
      {isActive && (
        <TableController
          {...{
            goToFirstPage,
            goToLastPage,
            goToNextPage,
            goToPrevPage,
            currentPage,
            totalPages,
            goToPage,
            visibleButtons,
            config: {
              pageSize,
              visibleButtons,
              variant,
              allowEndStartButtons,
              color,
            },
          }}
        ></TableController>
      )}
    </div>
  );
});

Table.displayName = "Table";

export default Table;
