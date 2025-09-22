import fetch from "node-fetch";

import { secrets } from "../../secrets/data-samples.mts";

const CANVAS_API_BASE_URL = "https://canvas.instructure.com/api/v1/";
const CANVAS_API_ENDPOINT_COURSES = CANVAS_API_BASE_URL + "courses/";

async function fetchCourses() {
  const response = await fetch(CANVAS_API_ENDPOINT_COURSES, {
    headers: {
      Authorization: `Bearer ${secrets.CANVAS_API_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

fetchCourses().then(console.log).catch(console.error);
