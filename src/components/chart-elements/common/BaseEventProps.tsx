type FixedProps = {
  eventType: "dot" | "category" | "bar" | "slice" | "bubble";
  categoryClicked: string;
};

type BaseEventProps = FixedProps & {
  [key: string]: number | string;
};

export default BaseEventProps;
