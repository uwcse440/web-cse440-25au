import * as React from "react";

import { ok as assert } from "assert";

import { SiteLinks } from "@/data/SiteLinks";
import {
  AssignmentCalendarItem,
  AwayCalendarItem,
  CalendarDate,
  CalendarItem,
  CalendarWeek,
  EventCalendarItem,
  HolidayCalendarItem,
  LectureCalendarItem,
  OfficeHourCalendarItem,
  StudioCalendarItem,
} from "@/types/CalendarData";
import {
  clamp as clampDate,
  format as datefnsFormat,
  isValid as datefnsIsValid,
  parse as datefnsParse,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
} from "date-fns";

const dayOfWeekValues = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
type dayOfWeek = (typeof dayOfWeekValues)[number];

// Type for time and location
export type TimeAndLocation = {
  time: string;
  location: string;
};

const TIME_AND_LOCATION_LECTURE: TimeAndLocation = {
  time: "10:00 to 11:20",
  location: "CSE2 G10",
};

const TIME_AND_LOCATIONS_SECTION: TimeAndLocation[] = [
  {
    time: "11:30 - 12:20",
    location: "MGH 058",
  },
  {
    time: "1:30 - 2:20",
    location: "MGH 058",
  },
];

const TIME_AND_LOCATION_EXAM_QA: TimeAndLocation = {
  time: "4:00 to 5:00",
  location: "Zoom",
};

const TIME_AND_LOCATION_POSTER_SESSION: TimeAndLocation = {
  time: "11:00 to 12:00",
  location: "CSE Atrium",
};

const TIME_AND_LOCATION_OFFICE_HOUR_JESSE: TimeAndLocation = {
  time: "3:00 to 4:00",
  location: "CSE2 151",
};

const TIME_AND_LOCATION_OFFICE_HOUR_TEANNA: TimeAndLocation = {
  time: "12:00 to 1:00",
  location: "CSE 5th Floor Breakout",
};

export function parseCalendarDate(calendarDate: CalendarDate): Date {
  const parsedDate = datefnsParse(calendarDate, "yyyy-MM-dd", new Date());
  assert(datefnsIsValid(parsedDate), `Invalid date: ${calendarDate}`);

  return parsedDate;
}

export function formatCalendarDate(
  calendarDate: CalendarDate,
  format: string,
): string {
  return datefnsFormat(parseCalendarDate(calendarDate), format);
}

export function calendarDates(): CalendarDate[] {
  return eachDayOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((dateCurrent: Date): CalendarDate => {
    return datefnsFormat(dateCurrent, "yyyy-MM-dd");
  });
}

export function calendarWeeks(): CalendarWeek[] {
  return eachWeekOfInterval({
    start: parseCalendarDate(calendarData.datesOfInstruction.start),
    end: parseCalendarDate(calendarData.datesOfInstruction.end),
  }).map((weekCurrent: Date): CalendarWeek => {
    return {
      startDate: datefnsFormat(weekCurrent, "yyyy-MM-dd"),
      dates: eachDayOfInterval({
        start: clampDate(weekCurrent, {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
        end: clampDate(endOfWeek(weekCurrent), {
          start: parseCalendarDate(calendarData.datesOfInstruction.start),
          end: parseCalendarDate(calendarData.datesOfInstruction.end),
        }),
      }).map((dateCurrent): CalendarDate => {
        return datefnsFormat(dateCurrent, "yyyy-MM-dd");
      }),
    };
  });
}

export function calendarItems(): CalendarItem[] {
  return [
    ...Object.values(calendarData.assignments),
    ...calendarData.aways,
    ...calendarData.events,
    ...calendarData.holidays,
    ...calendarData.lectures,
    ...calendarData.officeHours,
    ...calendarData.studios,
  ];
}

export function calendarItemsForDate(
  calendarDate: CalendarDate,
): CalendarItem[] {
  return calendarItems().filter(
    (calendarItemCurrent: CalendarItem): boolean => {
      if ("date" in calendarItemCurrent) {
        return calendarDate === calendarItemCurrent.date;
      } else {
        return calendarItemCurrent.dates.includes(calendarDate);
      }
    },
  );
}

function verifyCalendarDate(
  calendarDate: CalendarDate,
  dayOfWeek: dayOfWeek,
): CalendarDate {
  assert(dayOfWeekValues.includes(dayOfWeek));

  const parsedDate = parseCalendarDate(calendarDate);
  const parsedDateDayOfWeek = datefnsFormat(parsedDate, "EEE");
  assert(
    parsedDateDayOfWeek === dayOfWeek,
    `Date ${calendarDate} is not ${dayOfWeek}`,
  );

  return calendarDate;
}

export const calendarData: {
  datesOfInstruction: {
    start: CalendarDate;
    end: CalendarDate;
  };
  holidays: HolidayCalendarItem[];
  lectures: LectureCalendarItem[];
  studios: StudioCalendarItem[];
  events: EventCalendarItem[];
  aways: AwayCalendarItem[];
  officeHours: OfficeHourCalendarItem[];
  assignments: { [key: string]: AssignmentCalendarItem };
} = {
  datesOfInstruction: {
    start: verifyCalendarDate("2025-09-24", "Wed"),
    end: verifyCalendarDate("2025-12-08", "Mon"),
  },

  holidays: [
    {
      type: "holiday",
      title: "Veterans Day",
      date: verifyCalendarDate("2025-11-11", "Tue"),
    },
    {
      type: "holiday",
      title: "Thanksgiving",
      date: verifyCalendarDate("2025-11-27", "Thu"),
    },
    {
      type: "holiday",
      title: "Native American Heritage Day",
      date: verifyCalendarDate("2025-11-28", "Fri"),
    },
  ],

  lectures: [
    {
      type: "lecture",
      date: verifyCalendarDate("2025-09-25", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Introduction and Overview",
      slides: "https://canvas.uw.edu/files/139097581/",
    },
    //
    // Studio Lecture
    //
    {
      type: "lecture",
      date: verifyCalendarDate("2025-10-02", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design Diamond",
      slides: "https://canvas.uw.edu/files/139426346",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-10-07", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design Research",
      slides: "https://canvas.uw.edu/files/139639451/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-10-09", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design of Everyday Things",
      slides: "https://canvas.uw.edu/files/139792644/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-10-14", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Design of Everyday Things",
      slides: "https://canvas.uw.edu/files/139792644/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-10-16", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Task Analysis",
      slides: "https://canvas.uw.edu/files/140111397/",
    },
    //
    // Studio Lecture
    //
    {
      type: "lecture",
      date: verifyCalendarDate("2025-10-23", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Storyboarding and Paper Prototyping",
      slides: "https://canvas.uw.edu/files/140457549/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-11-04", "Tue"),
      // timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Models and Human Performance",
      // slides: "https://canvas.uw.edu/files/126193990/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-11-06", "Thu"),
      // timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Inspection and Usability Testing",
      // slides: "https://canvas.uw.edu/files/126329737/",
    },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-11-13", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Patterns and Interface Implementation",
      // slides: "https://canvas.uw.edu/files/126569767/",
    },
    // {
    //   type: "lecture",
    //   date: verifyCalendarDate("202X-11-14", "Thu"),
    //   timeAndLocation: TIME_AND_LOCATION_LECTURE,
    //   title: "History",
    //   slides: "https://canvas.uw.edu/files/126691264/",
    // },
    {
      type: "lecture",
      date: verifyCalendarDate("2025-11-20", "Thu"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Designing for Diverse Needs",
      // slides: "https://canvas.uw.edu/files/127038308/",
    },
  ],

  studios: [
    {
      type: "studio",
      dates: [
        verifyCalendarDate("2025-09-26", "Fri"),
        verifyCalendarDate("2025-10-03", "Fri"),
        verifyCalendarDate("2025-10-10", "Fri"),
        verifyCalendarDate("2025-10-17", "Fri"),
        verifyCalendarDate("2025-10-24", "Fri"),
        verifyCalendarDate("2025-11-07", "Fri"),
        verifyCalendarDate("2025-11-14", "Fri"),
        verifyCalendarDate("2025-11-21", "Fri"),
        verifyCalendarDate("2025-12-05", "Fri"),
      ],
      timeAndLocations: TIME_AND_LOCATIONS_SECTION,
      title: "Studio",
    },
    {
      type: "studio",
      date: verifyCalendarDate("2025-09-30", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Introduction to Critique",
      slides: "https://canvas.uw.edu/files/139307011",
    },
    {
      type: "studio",
      dates: [verifyCalendarDate("2025-10-21", "Tue")],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Studio",
      // slides: "https://canvas.uw.edu/files/125633734/",
    },
    {
      type: "studio",
      dates: [
        verifyCalendarDate("2025-11-25", "Tue"),
        verifyCalendarDate("2025-12-02", "Tue"),
        verifyCalendarDate("2025-12-04", "Thu"),
      ],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
      title: "Studio",
    },
    {
      type: "studio",
      title: "Design Meetings",
      dates: [
        verifyCalendarDate("2025-10-28", "Tue"),
        verifyCalendarDate("2025-10-30", "Thu"),
      ],
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
    },
    {
      type: "studio",
      title: "Design Meetings",
      date: verifyCalendarDate("2025-10-31", "Fri"),
      timeAndLocations: TIME_AND_LOCATIONS_SECTION,
    },
  ],

  events: [
    {
      type: "event",
      title: "Exam Q&A",
      date: verifyCalendarDate("2025-11-17", "Mon"),
      timeAndLocation: TIME_AND_LOCATION_EXAM_QA,
      // slides: "https://canvas.uw.edu/files/126571016/",
    },
    {
      type: "event",
      title: "Exam",
      date: verifyCalendarDate("2025-11-18", "Tue"),
      timeAndLocation: TIME_AND_LOCATION_LECTURE,
    },
    {
      type: "event",
      title: "Poster Session",
      date: verifyCalendarDate("2025-12-08", "Mon"),
      timeAndLocation: TIME_AND_LOCATION_POSTER_SESSION,
    },
  ],

  aways: [
    {
      type: "away",
      title: "James Away",
      dates: [
        verifyCalendarDate("2025-10-20", "Mon"),
        verifyCalendarDate("2025-10-21", "Tue"),
      ],
    },
    {
      type: "away",
      title: "Jesse Away",
      dates: [],
    },
    {
      type: "away",
      title: "Teanna Away",
      dates: [],
    },
  ],

  officeHours: [
    {
      type: "officeHour",
      title: "Office Hour: Jesse",
      timeAndLocation: TIME_AND_LOCATION_OFFICE_HOUR_JESSE,
      dates: [
        verifyCalendarDate("2025-10-01", "Wed"),
        verifyCalendarDate("2025-10-08", "Wed"),
        verifyCalendarDate("2025-10-15", "Wed"),
        verifyCalendarDate("2025-10-22", "Wed"),
        verifyCalendarDate("2025-10-29", "Wed"),
        verifyCalendarDate("2025-11-05", "Wed"),
        verifyCalendarDate("2025-11-12", "Wed"),
        // verifyCalendarDate("2025-11-19", "Wed"), // Exam Grading
        verifyCalendarDate("2025-11-26", "Wed"),
        verifyCalendarDate("2025-12-03", "Wed"),
      ],
    },
    {
      type: "officeHour",
      title: "Office Hour: Teanna",
      timeAndLocation: TIME_AND_LOCATION_OFFICE_HOUR_TEANNA,
      dates: [
        verifyCalendarDate("2025-10-02", "Thu"),
        verifyCalendarDate("2025-10-09", "Thu"),
        verifyCalendarDate("2025-10-16", "Thu"),
        verifyCalendarDate("2025-10-23", "Thu"),
        verifyCalendarDate("2025-10-30", "Thu"),
        verifyCalendarDate("2025-11-06", "Thu"),
        verifyCalendarDate("2025-11-13", "Thu"),
        verifyCalendarDate("2025-11-20", "Thu"),
        // verifyCalendarDate("2025-11-27", "Thu"), // Thanksgiving
        verifyCalendarDate("2025-12-04", "Thu"),
      ],
    },
  ],

  assignments: {
    //
    // Assignment 0
    //
    assignment_0: {
      type: "assignment",
      title: "Assignment 0: Introduction Slide",
      link: SiteLinks.assignment_0_top.href,
      date: verifyCalendarDate("2025-10-01", "Wed"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1746586/assignments/9634757",
    },

    //
    // Milestone 1
    //
    assignment_1_1: {
      type: "assignment",
      title: "Assignment 1.1: Individual Brainstorm",
      link: SiteLinks.assignment_1_1_top.href,
      date: verifyCalendarDate("2025-09-25", "Thu"),
      submission: "canvas",
      submitCanvasTime: "10:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688263",
    },
    assignment_1_2: {
      type: "assignment",
      title: "Assignment 1.2: Group Proposals",
      link: SiteLinks.assignment_1_2_top.href,
      date: verifyCalendarDate("2025-09-29", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688264",
    },
    assignment_1_3: {
      type: "assignment",
      title: "Assignment 1.3: Final Proposal",
      link: SiteLinks.assignment_1_3_top.href,
      date: verifyCalendarDate("2025-10-02", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688265",
    },
    assignment_1_4: {
      type: "assignment",
      title: "Assignment 1.4: Design Ideation",
      link: SiteLinks.assignment_1_4_top.href,
      date: verifyCalendarDate("2025-10-03", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688266",
    },
    milestone_1_report: {
      type: "assignment",
      title: "Milestone 1: Report",
      link: SiteLinks.milestone_1_report_top.href,
      date: verifyCalendarDate("2025-10-06", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688282",
    },
    milestone_1_contribution_statement: {
      type: "assignment",
      title: "Milestone 1: Contribution Statement",
      link: SiteLinks.milestone_1_report_top.href,
      date: verifyCalendarDate("2025-10-08", "Wed"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688281",
    },

    //
    // Milestone 2
    //
    assignment_2_1: {
      type: "assignment",
      title: "Assignment 2.1: Design Research Plan",
      link: SiteLinks.assignment_2_1_top.href,
      date: verifyCalendarDate("2025-10-09", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688267",
    },
    assignment_2_2: {
      type: "assignment",
      title: "Assignment 2.2: Design Research Check-In",
      link: SiteLinks.assignment_2_2_top.href,
      date: verifyCalendarDate("2025-10-16", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688268",
    },
    milestone_2_report: {
      type: "assignment",
      title: "Milestone 2: Report",
      link: SiteLinks.milestone_2_report_top.href,
      date: verifyCalendarDate("2025-10-20", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688284",
    },
    milestone_2_contribution_statement: {
      type: "assignment",
      title: "Milestone 2: Contribution Statement",
      link: SiteLinks.milestone_1_report_top.href,
      date: verifyCalendarDate("2025-10-22", "Wed"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688283",
    },

    //
    // Milestone 3
    //
    assignment_3_1: {
      type: "assignment",
      title: "Assignment 3.1: Task Review",
      link: SiteLinks.assignment_3_1_top.href,
      date: verifyCalendarDate("2025-10-23", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688269",
    },
    assignment_3_2: {
      type: "assignment",
      title: "Assignment 3.2: Design Review",
      link: SiteLinks.assignment_3_2_top.href,
      date: verifyCalendarDate("2025-10-27", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688270",
    },
    assignment_3_3: {
      type: "assignment",
      title: "Assignment 3.3: Design Meeting Reflection",
      link: SiteLinks.assignment_3_3_top.href,
      date: verifyCalendarDate("2025-11-01", "Sat"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      // submitCanvasLink:
      //   "https://canvas.uw.edu/courses/1746586/assignments/9764927",
    },
    assignment_3_4: {
      type: "assignment",
      title: "Assignment 3.4: Scenarios and Storyboards",
      link: SiteLinks.assignment_3_4_top.href,
      date: verifyCalendarDate("2025-11-04", "Tue"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688271",
    },
    milestone_3_report: {
      type: "assignment",
      title: "Milestone 3: Report",
      link: SiteLinks.milestone_3_report_top.href,
      date: verifyCalendarDate("2025-11-07", "Fri"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688286",
    },
    milestone_3_contribution_statement: {
      type: "assignment",
      title: "Milestone 3: Contribution Statement",
      link: SiteLinks.milestone_1_report_top.href,
      date: verifyCalendarDate("2025-11-09", "Sun"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688285",
    },

    //
    // Milestone 4
    //
    assignment_4_1: {
      type: "assignment",
      title: "Assignment 4.1: Paper Prototype",
      link: SiteLinks.assignment_4_1_top.href,
      date: verifyCalendarDate("2025-11-11", "Tue"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688272",
    },
    assignment_4_2: {
      type: "assignment",
      title: "Assignment 4.2: Heuristic Evaluation",
      link: SiteLinks.assignment_4_2_top.href,
      date: verifyCalendarDate("2025-11-13", "Thu"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688273",
    },
    assignment_4_3: {
      type: "assignment",
      title: "Assignment 4.3: Usability Testing",
      link: SiteLinks.assignment_4_3_top.href,
      date: verifyCalendarDate("2025-11-24", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688274",
    },
    milestone_4_report: {
      type: "assignment",
      title: "Milestone 4: Report",
      link: SiteLinks.milestone_4_report_top.href,
      date: verifyCalendarDate("2025-11-26", "Wed"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688288",
    },
    milestone_4_contribution_statement: {
      type: "assignment",
      title: "Milestone 4: Contribution Statement",
      link: SiteLinks.milestone_1_report_top.href,
      date: verifyCalendarDate("2025-11-28", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688287",
    },

    //
    // Milestone 5
    //
    assignment_5_digital_mockup: {
      type: "assignment",
      title: "Assignment 5: Digital Mockup",
      link: SiteLinks.assignment_5_digital_mockup_top.href,
      date: verifyCalendarDate("2025-12-01", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688275",
    },
    assignment_5_poster_initial: {
      type: "assignment",
      title: "Assignment 5: Initial Poster",
      link: SiteLinks.assignment_5_poster_top.href,
      date: verifyCalendarDate("2025-12-01", "Mon"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688277",
    },
    assignment_5_poster_final: {
      type: "assignment",
      title: "Assignment 5: Final Poster",
      link: SiteLinks.assignment_5_poster_top.href,
      date: verifyCalendarDate("2025-12-03", "Wed"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688276",
    },
    assignment_5_web_post_initial: {
      type: "assignment",
      title: "Assignment 5: Initial Web Post",
      link: SiteLinks.assignment_5_web_post_top.href,
      date: verifyCalendarDate("2025-12-03", "Wed"),
      submission: "canvas",
      submitCanvasTime: "3:00pm",
    },
    assignment_5_web_post_final: {
      type: "assignment",
      title: "Assignment 5: Final Web Post",
      link: SiteLinks.assignment_5_web_post_top.href,
      date: verifyCalendarDate("2025-12-05", "Fri"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
    },
    milestone_5_contribution_statement: {
      type: "assignment",
      title: "Milestone 5: Contribution Statement",
      link: SiteLinks.milestone_1_report_top.href,
      date: verifyCalendarDate("2025-12-07", "Sun"),
      submission: "canvas",
      submitCanvasTime: "8:00pm",
      submitCanvasLink:
        "https://canvas.uw.edu/courses/1828371/assignments/10688289",
    },
  },
};
