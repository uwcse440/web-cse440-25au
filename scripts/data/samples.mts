import { writeFile } from "fs/promises";

import fetch from "node-fetch";

import { secrets } from "../../secrets/data-samples.mts";

const SAMPLE_COURSE_NAME_MATCH = "CSE 440 Au 25";

const SAMPLE_PROJECTS: Array<{
  folderName: string;
  projectName: string;
  projectUrl: string;
}> = [
  {
    folderName: "betbreaker",
    projectName: "BetBreaker",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/betbreaker/",
  },
  {
    folderName: "boredwalk",
    projectName: "BoredWalk",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/boredwalk/",
  },
  {
    folderName: "dawgsense",
    projectName: "DawgSense",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/dawgsense/",
  },
  {
    folderName: "focusshift",
    projectName: "FocusShift",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/focusshift/",
  },
  {
    folderName: "gemhunter",
    projectName: "Gem Hunter",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/gemhunter/",
  },
  {
    folderName: "huskyride",
    projectName: "Husky Ride",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/huskyride/",
  },
  {
    folderName: "planventure",
    projectName: "Planventure",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/planventure/",
  },
  {
    folderName: "potpal",
    projectName: "Pot Pal",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/potpal/",
  },
  {
    folderName: "preparebear",
    projectName: "Prepare Bear",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/preparebear/",
  },
  {
    folderName: "tiltd",
    projectName: "Tiltd",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/tiltd/",
  },
  {
    folderName: "wanderlust",
    projectName: "Wanderlust",
    projectUrl:
      "https://courses.cs.washington.edu/courses/cse440/24au/projects/wanderlust/",
  },
];

const CANVAS_API_BASE_URL = "https://canvas.instructure.com/api/v1/";

type CanvasCourse = {
  id: number;
  name: string;
};

type CanvasFile = {
  id: number;
  folder_id: number;
  filename: string;
  url: string;
};

type CanvasFolder = {
  id: number;
  name: string;
};

// Fetch the courseId used in all following requests.
async function fetchCourseId(): Promise<number> {
  const response = await fetch(CANVAS_API_BASE_URL + "courses/", {
    headers: {
      Authorization: `Bearer ${secrets.CANVAS_API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.statusText}`);
  }

  const dataRaw = await response.json();
  const data: Array<{ id: number; name: string }> = (
    dataRaw as CanvasCourse[]
  ).map(({ id, name }) => ({ id, name }));
  const course = data.find((item) =>
    item.name.includes(SAMPLE_COURSE_NAME_MATCH),
  );

  if (course) {
    console.log(`Exporting samples from course: "${course.name}"`);
    return course.id;
  } else {
    throw new Error(`Course not found: "${SAMPLE_COURSE_NAME_MATCH}"`);
  }
}

// Fetch a list of all uploaded files.
async function fetchFiles(courseId: number) {
  let combinedResults: CanvasFile[] = [];
  let urlFiles: string | undefined =
    CANVAS_API_BASE_URL + `courses/${courseId}/files?per_page=100&page=1`;

  while (urlFiles) {
    const response = await fetch(urlFiles, {
      headers: {
        Authorization: `Bearer ${secrets.CANVAS_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.statusText}`);
    }

    const dataRaw = (await response.json()) as CanvasFile[];

    // Recover the fields we want, also generate the URL format.
    const data: CanvasFile[] = dataRaw.map(({ id, folder_id, filename }) => {
      const url = "https://canvas.uw.edu/files/" + id;

      return { id, folder_id, filename, url };
    });
    combinedResults = combinedResults.concat(data);

    // Parse link header for pagination.
    const linkHeader = response.headers.get("link");
    if (!linkHeader) {
      throw new Error("Expected link header not found");
    }

    // Split into a list of links.
    const linkEntries = linkHeader.split(",").map((s) => s.trim());

    // Parse each link and rel.
    const linkList: Array<{ link: string; rel: string }> = linkEntries.map(
      (link) => {
        const match = link.match(/<([^>]+)>;\s*rel="([^"]+)"/);

        return { link: match![1], rel: match![2] };
      },
    );

    // Find whether there is a next link.
    const nextUrl: string | undefined = linkList.find(
      (l) => l.rel === "next",
    )?.link;

    urlFiles = nextUrl;
  }

  return combinedResults;
}

// Fetch information about a folder.
async function fetchFolder(folderId: number): Promise<CanvasFolder> {
  const response = await fetch(CANVAS_API_BASE_URL + `folders/${folderId}`, {
    headers: {
      Authorization: `Bearer ${secrets.CANVAS_API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch folder: ${response.statusText}`);
  }

  const dataRaw = (await response.json()) as CanvasFolder;

  const data: CanvasFolder = {
    id: dataRaw.id,
    name: dataRaw.name,
  };

  return data;
}

async function organizeSamples(canvasFiles: CanvasFile[]) {
  // Find the root file named "m1_a11.pdf".
  const file_m1_a11 = canvasFiles.find(
    (file) => file.filename === "m1_a11.pdf",
  );
  if (!file_m1_a11) {
    throw new Error('Expected file "m1_a11.pdf" not found');
  }

  // Group files into a map of folder_id to arrays of files.
  const rawFolders = Object.groupBy(canvasFiles, (file) => file.folder_id);

  // Filter the folders to only those containing enough files to guarantee they are a project.
  const filteredFolders = Object.fromEntries(
    Object.entries(rawFolders).filter(([folderId, files]) => {
      return (
        files &&
        files.some((file) => file.filename === "m1_report.pdf") &&
        files.some((file) => file.filename === "m2_report.pdf") &&
        files.some((file) => file.filename === "m3_report.pdf") &&
        files.some((file) => file.filename === "m4_report.pdf") &&
        files.some((file) => file.filename === "m5_poster.pdf")
      );
    }),
  );

  // Fetch folder info for each filtered folder
  const projects = await Promise.all(
    Object.entries(filteredFolders).map(async ([folderId, files]) => {
      if (!files) {
        throw new Error(`Expected files not defined`);
      }

      const folder = await fetchFolder(Number(folderId));
      const sampleProject = SAMPLE_PROJECTS.find(
        (p) => p.folderName === folder.name,
      );

      if (!sampleProject) {
        throw new Error(`Expected folder name "${folder.name}" not found`);
      }

      return {
        folderName: folder.name,
        projectName: sampleProject.projectName,
        projectUrl: sampleProject.projectUrl,
        assignments: files.reduce(
          (
            assignments: Record<string, string | string[]>,
            file: CanvasFile,
          ): Record<string, string | string[]> => {
            const assignmentKey = file.filename
              .toLowerCase()
              .replace(".pdf", "");

            if (assignmentKey.startsWith("m4_a42")) {
              if (!assignments["m4_a42"]) {
                assignments["m4_a42"] = [];
              }

              (assignments["m4_a42"] as string[]).push(file.url);
            } else {
              assignments[assignmentKey] = file.url;
            }

            return assignments;
          },
          {} as Record<string, string | string[]>,
        ),
      };
    }),
  );

  return {
    m1_a11: { url: file_m1_a11.url },
    projects: projects,
  };
}

async function exportSamples(samples) {
  const content =
    'import { ProjectSamples } from "@/types/ProjectSamples";\n' +
    "\n" +
    `export const projectSamples: ProjectSamples = ${JSON.stringify(samples, null, 2)};\n`;

  await writeFile("./src/data/ProjectSamplesData.ts", content, "utf-8");

  return { message: "Samples exported to samples.ts" };
}

fetchCourseId()
  .then(fetchFiles)
  .then(organizeSamples)
  .then(exportSamples)
  .catch(console.error);
