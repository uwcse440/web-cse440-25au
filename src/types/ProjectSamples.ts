export type ProjectSampleAssignments = {
  m1_a12: string;
  m1_a13: string;
  m1_a14: string;
  m1_report: string;
  m2_a21: string;
  m2_a22: string;
  m2_report: string;
  m3_a31: string;
  m3_a32: string;
  m3_a34: string;
  m3_report: string;
  m4_a41: string;
  m4_a42: string[];
  m4_a43: string;
  m4_report: string;
  m5_a51: string;
  m5_poster: string;
};

export type ProjectSamples = {
  m1_a11: { url: string };
  projects: {
    folderName: string;
    projectName: string;
    projectUrl: string;
    assignments: ProjectSampleAssignments;
  }[];
};
