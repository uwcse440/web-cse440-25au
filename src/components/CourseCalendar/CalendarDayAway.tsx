import * as React from "react";

import { CalendarItem, filterAwayCalendarItems } from "@/types/CalendarData";
import { Grid } from "@mui/material";

export const CalendarDayAway: React.FunctionComponent<{
  calendarItems: CalendarItem[];
}> = ({ calendarItems }) => {
  const awayCalendarItems = filterAwayCalendarItems(calendarItems);

  if (awayCalendarItems.length === 0) {
    return null;
  }

  return awayCalendarItems.map(
    (itemCurrent, indexCurrent): React.ReactElement => {
      return (
        <Grid
          key={indexCurrent}
          item
          xs={12}
          sx={{
            borderLeftColor: "orange",
            borderLeftStyle: "solid",
            borderLeftWidth: 5,
            paddingLeft: 1,
          }}
        >
          {itemCurrent.title}
        </Grid>
      );
    },
  );
};
