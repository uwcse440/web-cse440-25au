// import imageLogoA from "public/images/projects/templates/project_thumb.png";
// import imageLogoB from "public/images/projects/templates/project_thumb.png";
// import imageLogoC from "public/images/projects/templates/project_thumb.png";
// import imageLogoD from "public/images/projects/templates/project_thumb.png";
// import imageLogoE from "public/images/projects/templates/project_thumb.png";
// import imageLogoF from "public/images/projects/templates/project_thumb.png";
// import imageLogoG from "public/images/projects/templates/project_thumb.png";
// import imageLogoH from "public/images/projects/templates/project_thumb.png";
// import imageLogoI from "public/images/projects/templates/project_thumb.png";
// import imageLogoJ from "public/images/projects/templates/project_thumb.png";
// import imageLogoK from "public/images/projects/templates/project_thumb.png";
// import imageLogoL from "public/images/projects/templates/project_thumb.png";

import { ProjectLink } from "@/types/ProjectLink";

// Names and links associated with projects need to be maintained:
// - Here.
// - In the folder structure of /public/images/projects.
// - In the folder structure of /src/app/projects.
// - In /public/.htaccess.
export const UnsortedProjectLinks: ProjectLink[] = [
  // {
  //   href: "/projects/gemhunter/",
  //   anchor: "Gem Hunter",
  //   logo: gemHunter,
  // },
  // {
  //   href: "/projects/dawgsense/",
  //   anchor: "DawgSense",
  //   logo: imageLogoB,
  // },
  // {
  //   href: "/projects/tiltd/",
  //   anchor: "Tiltd",
  //   logo: imageLogoC,
  // },
  // {
  //   href: "/projects/preparebear/",
  //   anchor: "Prepare Bear",
  //   logo: imageLogoD,
  // },
  // {
  //   href: "/projects/potpal/",
  //   anchor: "Pot Pal",
  //   logo: imageLogoE,
  // },
  // {
  //     href: "/projects/missing/",
  //     anchor: "Missing",
  //     logo: imageLogoF,
  // },
  // {
  //   href: "/projects/wanderlust/",
  //   anchor: "Wanderlust",
  //   logo: imageLogoG,
  // },
  // {
  //   href: "/projects/betbreaker/",
  //   anchor: "BetBreaker",
  //   logo: imageLogoH,
  // },
  // {
  //   href: "/projects/huskyride/",
  //   anchor: "Husky Ride",
  //   logo: imageLogoI,
  // },
  // {
  //   href: "/projects/focusshift/",
  //   anchor: "FocusShift",
  //   logo: imageLogoJ,
  // },
  // {
  //   href: "/projects/boredwalk/",
  //   anchor: "BoredWalk",
  //   logo: imageLogoK,
  // },
  // {
  //   href: "/projects/planventure/",
  //   anchor: "Planventure",
  //   logo: imageLogoL,
  // },
];

export const ProjectLinks: ProjectLink[] =
  UnsortedProjectLinks.length > 0
    ? [...UnsortedProjectLinks].sort((a, b) =>
        a.href.localeCompare(b.href, undefined, { sensitivity: "base" }),
      )
    : (UnsortedProjectLinks as ProjectLink[]);
