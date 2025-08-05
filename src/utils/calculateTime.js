import humanizeDuration from "humanize-duration";

export const calculateChapterTime = (chapter) => {
  let time = 0;
  chapter.chapterContent.forEach((lecture) => {
    time += lecture.lectureDuration;
  });

  return humanizeDuration(time * 60 * 1000, {
    units: ["h", "m"],
    round: true,
  });
};

export const calculateCourseDuration = (course) => {
  let time = 0;

  course.courseContent.forEach((chapter) => {
    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration;
    });
  });

  return humanizeDuration(time * 60 * 1000, {
    units: ["h", "m"],
    round: true,
  });
};

export const calculateNoOfLectures = (course) => {
  let totalLectures = 0;
  course.courseContent.forEach((chapter) => {
    if (Array.isArray(chapter.chapterContent)) {
      totalLectures += chapter.chapterContent.length;
    }
  });
  return totalLectures;
};
