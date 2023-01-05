import React from "react";

import { Card, TableBody, TableHead, TableHeaderCell } from "components";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import BadgeDelta from "components/icon-elements/BadgeDelta/BadgeDelta";
import Table from "components/list-elements/Table/Table";
import TableCell from "components/list-elements/Table/TableCell";
import TableRow from "components/list-elements/Table/TableRow";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Tremor/ListElements/Table",
  component: Table,
} as ComponentMeta<typeof Table>;
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof Table> = (args) => (
  <Card>
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Sales ($)</TableHeaderCell>
          <TableHeaderCell>Region</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell textAlignment="text-right">
            Working Hours (h)
          </TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <TableCell>Peter Doe</TableCell>
          <TableCell>1.000.000</TableCell>
          <TableCell>Region A</TableCell>
          <TableCell>
            <BadgeDelta
              deltaType="moderateIncrease"
              text="overperforming"
              size="xs"
            />
          </TableCell>
          <TableCell textAlignment="text-right">211</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jon Doe</TableCell>
          <TableCell>2.202.000</TableCell>
          <TableCell>Region B</TableCell>
          <TableCell>
            <BadgeDelta deltaType="increase" text="overperforming" size="xs" />
          </TableCell>
          <TableCell textAlignment="text-right">320</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jon Doe</TableCell>
          <TableCell>2.202.000</TableCell>
          <TableCell>Region B</TableCell>
          <TableCell>
            <BadgeDelta
              deltaType="moderateDecrease"
              text="underperforming"
              size="xs"
            />
          </TableCell>
          <TableCell textAlignment="text-right">290</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jon Doe</TableCell>
          <TableCell>2.202.000</TableCell>
          <TableCell>Region B</TableCell>
          <TableCell>
            <BadgeDelta
              deltaType="moderateDecrease"
              text="underperforming"
              size="xs"
            />
          </TableCell>
          <TableCell textAlignment="text-right">340</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jon Doe</TableCell>
          <TableCell>2.202.000</TableCell>
          <TableCell>Region B</TableCell>
          <TableCell>
            <BadgeDelta deltaType="unchanged" text="average" size="xs" />
          </TableCell>
          <TableCell textAlignment="text-right">430</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jon Doe</TableCell>
          <TableCell>2.202.000</TableCell>
          <TableCell>Region B</TableCell>
          <TableCell>
            <BadgeDelta
              deltaType="moderateDecrease"
              text="underperforming"
              size="xs"
            />
          </TableCell>
          <TableCell textAlignment="text-right">190</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jon Doe</TableCell>
          <TableCell>2.202.000</TableCell>
          <TableCell>Region B</TableCell>
          <TableCell>
            <BadgeDelta
              deltaType="moderateIncrease"
              text="overperforming"
              size="xs"
            />
          </TableCell>
          <TableCell textAlignment="text-right">3100</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jon Doe</TableCell>
          <TableCell>2.202.000</TableCell>
          <TableCell>Region B</TableCell>
          <TableCell>
            <BadgeDelta
              deltaType="moderateDecrease"
              text="underperforming"
              size="xs"
            />
          </TableCell>
          <TableCell textAlignment="text-right">340</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jon Doe</TableCell>
          <TableCell>2.202.000</TableCell>
          <TableCell>Region B</TableCell>
          <TableCell>
            <BadgeDelta
              deltaType="moderateDecrease"
              text="underperforming"
              size="lg"
            />
          </TableCell>
          <TableCell textAlignment="text-right">170</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Max Doe</TableCell>
          <TableCell>1.000.000</TableCell>
          <TableCell>Region A</TableCell>
          <TableCell>
            <BadgeDelta
              deltaType="moderateDecrease"
              text="underperforming"
              size="xs"
            />
          </TableCell>
          <TableCell textAlignment="text-right">340</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  children: undefined,
};
