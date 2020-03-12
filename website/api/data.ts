import axios from "./client";

const getCourses = async () => {
  try {
    const { data } = await axios.get("/data/courses");
    return data.courses;
  } catch (err) {
    console.error(err);
  }
};

const getDataForCourseUrl = async (courseUrl: string) => {
  const d = {
    courseUrl,
  };

  try {
    const { data } = await axios.get("/data/courseUrl", { params: d });
    return data.data;
  } catch (err) {
    console.error(err);
  }
};

export default {
  getCourses,
  getDataForCourseUrl,
};
