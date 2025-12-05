import { ProjectLink } from "@/types/ProjectLink";
import imageLogoE from "public/images/projects/abroad/project_thumb.png";
import imageLogoJ from "public/images/projects/campuskey/project_thumb.png";
import imageLogoA from "public/images/projects/focusflow/project_thumb.png";
import imageLogoK from "public/images/projects/foodpassport/project_thumb.png";
import imageLogoB from "public/images/projects/goalkeeper/project_thumb.png";
import imageLogoL from "public/images/projects/netizen/project_thumb.png";
import imageLogoF from "public/images/projects/nextleap/project_thumb.png";
import imageLogoI from "public/images/projects/personalizehealthycare/project_thumb.png";
import imageLogoD from "public/images/projects/pomopet/project_thumb.png";
import imageLogoG from "public/images/projects/quackback/project_thumb.png";
import imageLogoH from "public/images/projects/reform/project_thumb.png";
import imageLogoC from "public/images/projects/rxflect/project_thumb.png";

// Names and links associated with projects need to be maintained:
// - Here.
// - In the folder structure of /public/images/projects.
// - In the folder structure of /src/app/projects.
// - In /public/.htaccess.
export const UnsortedProjectLinks: ProjectLink[] = [
  {
    href: "/projects/focusflow/",
    anchor: "FocusFlow",
    logo: imageLogoA,
  },
  {
    href: "/projects/goalkeeper/",
    anchor: "GoalKeeper",
    logo: imageLogoB,
  },
  {
    href: "/projects/rxflect/",
    anchor: "RxFlect",
    logo: imageLogoC,
  },
  {
    href: "/projects/pomopet/",
    anchor: "Pomopet",
    logo: imageLogoD,
  },
  {
    href: "/projects/abroad/",
    anchor: "Abroad",
    logo: imageLogoE,
  },
  {
    href: "/projects/nextleap/",
    anchor: "NextLeap",
    logo: imageLogoF,
  },
  {
    href: "/projects/quackback/",
    anchor: "QuackBack",
    logo: imageLogoG,
  },
  {
    href: "/projects/reform/",
    anchor: "Re:Form",
    logo: imageLogoH,
  },
  {
    href: "/projects/personalizehealthycare/",
    anchor: "Personalize Healthy Care",
    logo: imageLogoI,
  },
  {
    href: "/projects/campuskey/",
    anchor: "CampusKey",
    logo: imageLogoJ,
  },
  {
    href: "/projects/foodpassport/",
    anchor: "Food Passport",
    logo: imageLogoK,
  },
  {
    href: "/projects/netizen/",
    anchor: "Netizen!",
    logo: imageLogoL,
  },
];

export const ProjectLinks: ProjectLink[] =
  UnsortedProjectLinks.length > 0
    ? [...UnsortedProjectLinks].sort((a, b) =>
        a.href.localeCompare(b.href, undefined, { sensitivity: "base" }),
      )
    : (UnsortedProjectLinks as ProjectLink[]);
