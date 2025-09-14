import * as React from "react";

export type CourseDataLinkHREF = string;

export type CourseDataLinkKey = {
  href?: CourseDataLinkHREF;
  anchor?: React.ReactNode;
};

export const courseData = {
  // Link to course Canvas. No trailing slash.
  linkCanvas: {
    href: "https://canvas.uw.edu/courses/1828371",
  },

  // Link to Google Drive folder shared with students.
  linkDriveProjectFiles: {
    href: "https://drive.google.com/drive/folders/1URdb2hFP-y03o-113CEaod0PzdFjhfpf?usp=sharing",
  },

  // Links to Figma poster templates.
  linkFigmaPosterTemplates: {
    href: "https://www.figma.com/file/fK3x9CC0ZGXxjvvSfHg2t9/CSE440-Poster-Example-%26-Template?type=design&node-id=0%3A1&mode=design&t=4hrUv6ue9a5HxeXn-1",
    anchor: "Figma Templates",
  },

  // Link to course GitHub.
  linkGitHub: {
    href: "https://github.com/uwcse440/web-cse440-25au",
  },

  // Link to university COVID-19 guidelines.
  linkUniversityCovidGuidelines: {
    href: "https://www.ehs.washington.edu/covid-19-prevention-and-response/covid-19-illness-and-exposure-guidance",
  },

  // Link to university syllabus policies and guidelines.
  linkUniversitySyllabusGuidelines: {
    href: "https://registrar.washington.edu/curriculum/syllabus-guidelines/",
  },
} as const;
