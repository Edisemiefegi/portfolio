import { tableDB } from "../utils/appwrite";
import { DB_ID, TABLES, fileUrl } from "./useAdmin";
import {
  defaultProfile,
  defaultExperiences,
  defaultProjects,
  defaultSkills,
} from "~/data/defaults";

const fetchRows = async (table) => {
  try {
    const res = await tableDB.listRows({ databaseId: DB_ID, tableId: TABLES[table] });
    return res.rows;
  } catch {
    return [];
  }
};

const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999) || new Date(a.$createdAt) - new Date(b.$createdAt);
const clean = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null && v !== ""));

// Public site content: rendered from defaults first (fast, SEO-friendly), then hydrated from Appwrite.
export const useContent = () => {
  const content = useState("site-content", () => ({
    profile: defaultProfile,
    experiences: defaultExperiences,
    projects: defaultProjects,
    skills: defaultSkills,
    live: false,
  }));

  const load = async () => {
    if (content.value.live) return;
    const [profile, experiences, projects, skills] = await Promise.all([
      fetchRows("profile"),
      fetchRows("experiences"),
      fetchRows("projects"),
      fetchRows("skills"),
    ]);

    const published = projects
      .filter((p) => p.status !== "draft")
      .sort(byOrder)
      .map((p) => ({ ...p, image: fileUrl(p.image) }));

    content.value = {
      profile: { ...defaultProfile, ...clean(profile[0] || {}) },
      experiences: experiences.length ? experiences.sort(byOrder) : defaultExperiences,
      projects: published.length ? published : defaultProjects,
      skills: skills.length ? skills.sort(byOrder) : defaultSkills,
      live: true,
    };
  };

  return { content, load };
};
