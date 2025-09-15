import * as React from "react";

import { ok as assert } from "assert";

import { SiteLinks } from "@/data/SiteLinks";

export const SITE_LINKS = [
  SiteLinks.homeTop,
  SiteLinks.assignmentsTop,
  [
    SiteLinks.assignmentsPaperPresentationsTop,
    // {
    //   href: SiteLinks.assignmentsPaperPresentationsTop.href,
    //   anchor: (() => {
    //     assert(
    //       SiteLinks.assignmentsPaperPresentationsTop.anchor ===
    //         "Paper Presentations",
    //     );
    //
    //     return (
    //       <React.Fragment>
    //         Paper
    //         <br />
    //         Presentations
    //       </React.Fragment>
    //     );
    //   })(),
    // },
    SiteLinks.assignmentsTechnologyLabTop,
    // {
    //   href: SiteLinks.assignmentsTechnologyLabTop.href,
    //   anchor: (() => {
    //     assert(
    //       SiteLinks.assignmentsTechnologyLabTop.anchor === "Technology Lab",
    //     );
    //
    //     return (
    //       <React.Fragment>
    //         Technology
    //         <br />
    //         Lab
    //       </React.Fragment>
    //     );
    //   })(),
    // },
    SiteLinks.assignmentsProjectTop,
  ],
  SiteLinks.calendarTop,
];

export const PAGE_LINKS_PAPER_PRESENTATIONS = [
  SiteLinks.assignmentsPaperPresentationsTop,
  [
    SiteLinks.assignmentsPaperPresentationsStudentPresentations,
    SiteLinks.assignmentsPaperPresentationsPresentationLogistics,
  ],
];

export const PAGE_LINKS_TECHNOLOGY_LAB = [
  SiteLinks.assignmentsTechnologyLabTop,
  [
    SiteLinks.assignmentsTechnologyLabRequirements,
    SiteLinks.assignmentsTechnologyLabDeliverables,
    SiteLinks.assignmentsTechnologyLabExample,
    SiteLinks.assignmentsTechnologyLabAssessmentOfExample,
    // {
    //   href: SiteLinks.assignmentsTechnologyLabAssessmentOfExample.href,
    //   anchor: (() => {
    //     assert(
    //       SiteLinks.assignmentsTechnologyLabAssessmentOfExample.anchor === "Assessment of Example",
    //     );
    //
    //     return (
    //       <React.Fragment>
    //         Assessment
    //         <br />
    //         of Example
    //       </React.Fragment>
    //     );
    //   })(),
    // },
  ],
];

export const PAGE_LINKS_PROJECT = [
  SiteLinks.assignmentsProjectTop,
  SiteLinks.assignmentsProjectDeliverables,
  [
    SiteLinks.assignmentsProjectIntroductionAndIdea,
    SiteLinks.assignmentsProjectGroupBrainstorm,
    SiteLinks.assignmentsProjectGroupsFinalized,
    SiteLinks.assignmentsProjectDesignProposal,
    SiteLinks.assignmentsProjectFormativeResearch,
    SiteLinks.assignmentsProjectInteractivePrototype,
    SiteLinks.assignmentsProjectRevisedPrototype,
    SiteLinks.assignmentsProjectPoster,
    SiteLinks.assignmentsProjectFinalPrototype,
    SiteLinks.assignmentsProjectPresentation,
    SiteLinks.assignmentsProjectPosterShowcase,
    // {
    //   href: SiteLinks.assignmentsProjectFinalPosterPresentationShowcase.href,
    //   anchor: (() => {
    //     assert(
    //       SiteLinks.assignmentsProjectFinalPosterPresentationShowcase.anchor === "Poster, Presentation, and Showcase",
    //     );
    //
    //     return (
    //       <React.Fragment>
    //         Poster, Presentation,
    //         <br />
    //         and Showcase
    //       </React.Fragment>
    //     );
    //   })(),
    // },
  ],
  SiteLinks.assignmentsProjectDesignStatusReports,
];
