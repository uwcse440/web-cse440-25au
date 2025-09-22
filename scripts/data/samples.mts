import fetch from "node-fetch";

import { secrets } from "../../secrets/data-samples.mts";

const COURSE_NAME_MATCH = "CSE 440 Au 25";

const CANVAS_API_BASE_URL = "https://canvas.instructure.com/api/v1/";

async function fetchCourseId(): Promise<number> {
  const response = await fetch(CANVAS_API_BASE_URL + "courses/", {
    headers: {
      Authorization: `Bearer ${secrets.CANVAS_API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.statusText}`);
  }

  const data = (await response.json()) as Array<{ id: number; name: string }>;
  const course = data.find((item) => item.name.includes(COURSE_NAME_MATCH));

  if (course) {
    console.log(`Exporting samples from course: "${course.name}"`);
    return course.id;
  } else {
    throw new Error(`Course not found: "${COURSE_NAME_MATCH}"`);
  }
}

async function fetchFiles(courseId: number) {
  const response = await fetch(
    CANVAS_API_BASE_URL + `courses/${courseId}/files?per_page=100&page=1`,
    {
      headers: {
        Authorization: `Bearer ${secrets.CANVAS_API_KEY}`,
      },
    },
  );

  const data = await response.json();

  return data;
}

fetchCourseId().then(fetchFiles).then(console.log).catch(console.error);
