import { ProjectLinks } from "@/app/projects/projectlinks";
import { SiteLinks } from "@/data/SiteLinks";

export const SITE_LINKS = [
  SiteLinks.homeTop,
  SiteLinks.projectsTop,
  SiteLinks.assignmentsTop,
  [
    SiteLinks.milestone_1_top,
    SiteLinks.milestone_2_top,
    SiteLinks.milestone_3_top,
    SiteLinks.milestone_4_top,
    SiteLinks.milestone_5_top,
  ],
  SiteLinks.calendarTop,
];

export const PAGE_LINKS_MILESTONE_1 = [
  SiteLinks.milestone_1_top,
  [
    SiteLinks.assignment_1_1_top,
    SiteLinks.assignment_1_2_top,
    SiteLinks.assignment_1_3_top,
    SiteLinks.assignment_1_4_top,
    SiteLinks.milestone_1_report_top,
  ],
];

export const PAGE_LINKS_MILESTONE_2 = [
  SiteLinks.milestone_2_top,
  [
    SiteLinks.assignment_2_1_top,
    SiteLinks.assignment_2_2_top,
    SiteLinks.milestone_2_report_top,
  ],
];

export const PAGE_LINKS_MILESTONE_3 = [
  SiteLinks.milestone_3_top,
  [
    SiteLinks.assignment_3_1_top,
    SiteLinks.assignment_3_2_top,
    SiteLinks.assignment_3_3_top,
    SiteLinks.assignment_3_4_top,
    SiteLinks.milestone_3_report_top,
  ],
];

export const PAGE_LINKS_MILESTONE_4 = [
  SiteLinks.milestone_4_top,
  [
    SiteLinks.assignment_4_1_top,
    SiteLinks.assignment_4_2_top,
    SiteLinks.assignment_4_3_top,
    SiteLinks.milestone_4_report_top,
  ],
];

export const PAGE_LINKS_MILESTONE_5 = [
  SiteLinks.milestone_5_top,
  [
    SiteLinks.assignment_5_digital_mockup_top,
    SiteLinks.assignment_5_poster_top,
    SiteLinks.assignment_5_web_post_top,
  ],
];

export const PAGE_LINKS_PROJECTS = [SiteLinks.projectsTop, ProjectLinks];

// import * as React from "react";

// import { ok as assert } from "assert";

// import { SiteLinks } from "@/data/SiteLinks";

// export const SITE_LINKS = [
//   SiteLinks.homeTop,
//   SiteLinks.assignmentsTop,
//   [
//     SiteLinks.assignmentsPaperPresentationsTop,
//     // {
//     //   href: SiteLinks.assignmentsPaperPresentationsTop.href,
//     //   anchor: (() => {
//     //     assert(
//     //       SiteLinks.assignmentsPaperPresentationsTop.anchor ===
//     //         "Paper Presentations",
//     //     );
//     //
//     //     return (
//     //       <React.Fragment>
//     //         Paper
//     //         <br />
//     //         Presentations
//     //       </React.Fragment>
//     //     );
//     //   })(),
//     // },
//     SiteLinks.assignmentsTechnologyLabTop,
//     // {
//     //   href: SiteLinks.assignmentsTechnologyLabTop.href,
//     //   anchor: (() => {
//     //     assert(
//     //       SiteLinks.assignmentsTechnologyLabTop.anchor === "Technology Lab",
//     //     );
//     //
//     //     return (
//     //       <React.Fragment>
//     //         Technology
//     //         <br />
//     //         Lab
//     //       </React.Fragment>
//     //     );
//     //   })(),
//     // },
//     SiteLinks.assignmentsProjectTop,
//   ],
//   SiteLinks.calendarTop,
// ];

// export const PAGE_LINKS_PAPER_PRESENTATIONS = [
//   SiteLinks.assignmentsPaperPresentationsTop,
//   [
//     SiteLinks.assignmentsPaperPresentationsStudentPresentations,
//     SiteLinks.assignmentsPaperPresentationsPresentationLogistics,
//   ],
// ];

// export const PAGE_LINKS_TECHNOLOGY_LAB = [
//   SiteLinks.assignmentsTechnologyLabTop,
//   [
//     SiteLinks.assignmentsTechnologyLabRequirements,
//     SiteLinks.assignmentsTechnologyLabDeliverables,
//     SiteLinks.assignmentsTechnologyLabExample,
//     SiteLinks.assignmentsTechnologyLabAssessmentOfExample,
//     // {
//     //   href: SiteLinks.assignmentsTechnologyLabAssessmentOfExample.href,
//     //   anchor: (() => {
//     //     assert(
//     //       SiteLinks.assignmentsTechnologyLabAssessmentOfExample.anchor === "Assessment of Example",
//     //     );
//     //
//     //     return (
//     //       <React.Fragment>
//     //         Assessment
//     //         <br />
//     //         of Example
//     //       </React.Fragment>
//     //     );
//     //   })(),
//     // },
//   ],
// ];

// export const PAGE_LINKS_PROJECT = [
//   SiteLinks.assignmentsProjectTop,
//   SiteLinks.assignmentsProjectDeliverables,
//   [
//     SiteLinks.assignmentsProjectIntroductionAndIdea,
//     SiteLinks.assignmentsProjectGroupBrainstorm,
//     SiteLinks.assignmentsProjectGroupsFinalized,
//     SiteLinks.assignmentsProjectDesignProposal,
//     SiteLinks.assignmentsProjectFormativeResearch,
//     SiteLinks.assignmentsProjectInteractivePrototype,
//     SiteLinks.assignmentsProjectRevisedPrototype,
//     SiteLinks.assignmentsProjectPoster,
//     SiteLinks.assignmentsProjectFinalPrototype,
//     SiteLinks.assignmentsProjectPresentation,
//     SiteLinks.assignmentsProjectPosterShowcase,
//     // {
//     //   href: SiteLinks.assignmentsProjectFinalPosterPresentationShowcase.href,
//     //   anchor: (() => {
//     //     assert(
//     //       SiteLinks.assignmentsProjectFinalPosterPresentationShowcase.anchor === "Poster, Presentation, and Showcase",
//     //     );
//     //
//     //     return (
//     //       <React.Fragment>
//     //         Poster, Presentation,
//     //         <br />
//     //         and Showcase
//     //       </React.Fragment>
//     //     );
//     //   })(),
//     // },
//   ],
//   SiteLinks.assignmentsProjectDesignStatusReports,
// ];
