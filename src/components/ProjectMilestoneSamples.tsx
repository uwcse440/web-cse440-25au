import * as React from "react";

import { AppLink } from "@/components/links/AppLink";
import { projectSamples } from "@/data/ProjectSamplesData";
import { ProjectSampleAssignments } from "@/types/ProjectSamples";

interface ProjectMilestoneSamplesProps {
  assignment: keyof ProjectSampleAssignments;
}

export const ProjectMilestoneSamples: React.FunctionComponent<
  ProjectMilestoneSamplesProps
> = (props) => {
  // // Validate props, TypeScript does not validate in MDX
  // assertProjectSampleMilestoneKey(props.milestone);

  return (
    <React.Fragment>
      {(() => {
        return (
          <ul>
            {projectSamples.projects.map((projectCurrent) => {
              if (props.assignment === "m4_a42") {
                return (
                  <React.Fragment key={projectCurrent.folderName}>
                    <li>
                      {"Sample Submissions "}
                      {projectCurrent.assignments.m4_a42.map(
                        (urlCurrent, index) => {
                          return (
                            <React.Fragment key={index}>
                              <AppLink href={urlCurrent}>{index + 1}</AppLink>
                              {index <
                              projectCurrent.assignments.m4_a42.length - 1
                                ? ", "
                                : ""}
                            </React.Fragment>
                          );
                        },
                      )}
                      {" from "}
                      <AppLink href={projectCurrent.projectUrl}>
                        {projectCurrent.projectName}
                      </AppLink>
                      {" in Autumn 2024"}
                    </li>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={projectCurrent.folderName}>
                    <li>
                      <AppLink
                        href={
                          projectCurrent.assignments[props.assignment] as string
                        }
                      >
                        {"Sample Submission"}
                      </AppLink>
                      {" from "}
                      <AppLink href={projectCurrent.projectUrl}>
                        {projectCurrent.projectName}
                      </AppLink>
                      {" in Autumn 2024"}
                    </li>
                  </React.Fragment>
                );
              }
            })}
          </ul>
        );
      })()}
    </React.Fragment>
  );
};
