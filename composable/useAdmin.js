const db_Id = "692c73d700038ff2f45a";
const projects = "projects";
const image = "projectImages";
const skill = "skills";
const aboutTableId = "about";
const aboutProfileId = "about_profile";

export const useAdmin = () => {
  const loading = ref(false);
  const error = ref(null);

  const createProject = async (payload) => {
    loading.value = true;
    error.value = null;

    try {
      const id = ID.unique();
      console.log("initial PAYLOAD:", payload);

      // convert stack from string to array
      if (typeof payload.stack === "string") {
        payload.stack = payload.stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }

      console.log("FINAL PAYLOAD:", payload);

      // upload image if provided
      if (payload.image instanceof File) {
        const fileId = ID.unique();
        const uploaded = await storage.createFile(image, fileId, payload.image);

        payload.image = uploaded.$id;
      }

      const doc = await tableDB.createRow({
        databaseId: db_Id,
        tableId: projects,
        rowId: id,
        data: payload,
      });

      return doc;
    } catch (err) {
      console.log("CREATE PROJECT ERROR:", err);
      error.value = err.message || "Something went wrong";
    } finally {
      loading.value = false;
    }
  };

  const listProjects = async () => {
    loading.value = true;
    try {
      const res = await tableDB.listRows({
        databaseId: db_Id,
        tableId: projects,
        queries: [],
      });
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id) => {
    await tableDB.deleteRow({
      databaseId: db_Id,
      tableId: projects,
      rowId: id,
    });
  };

  const editProject = async (id, payload) => {
    try {
      const cleanPayload = {
        title: payload.title,
        stack: payload.stack,
        url: payload.url,
        githubLink: payload.githubLink,
        description: payload.description,
        status: payload.status,
      };
      if (payload.image instanceof File) {
        const uploaded = await storage.createFile(
          "projectImages",
          ID.unique(),
          payload.image
        );
        cleanPayload.image = uploaded.$id;
      }

      const promise = tableDB.updateRow(db_Id, projects, id, cleanPayload);

      return promise;
    } catch (error) {
      console.log(error.message);
    }
  };

  const addStack = async () => {
    try {
      const id = ID.unique();

      const doc = await tableDB.createRow();
    } catch (error) {}
  };

  const createAbout = async (payload) => {
    loading.value = true;
    try {
      const id = ID.unique();

      const doc = await tableDB.createRow({
        databaseId: db_Id,
        tableId: aboutTableId,
        rowId: id,
        data: payload,
      });

      return doc;
    } catch (err) {
      console.error("CREATE ABOUT ERROR:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteAboutSection = async (id) => {
    await tableDB.deleteRow({
      databaseId: db_Id,
      tableId: aboutTableId,
      rowId: id,
    });
  };
  const editAbout = async (id, payload) => {
    loading.value = true;
    try {
      const cleanPayload = {
        company: payload.company,
        role: payload.role,
        summary: payload.summary,
        date: payload.date,
      };
      const updated = await tableDB.updateRow({
        databaseId: db_Id,
        tableId: aboutTableId,
        rowId: id,
        data: cleanPayload,
      });
      return updated;
    } catch (err) {
      console.error("EDIT ABOUT ERROR:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateAboutProfile = async (id, payload) => {
    const updated = await tableDB.updateRow({
      databaseId: db_Id,
      tableId: aboutTableId,
      rowId: id,
      data: { bio: payload.bio, hobbie: payload.hobbie },
    });
    return updated;
  };

  const getAboutProfile = async () => {
    try {
      const res = await tableDB.listRows({
        databaseId: db_Id,
        tableId: aboutProfileId,
      });

      return res.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const listAbouts = async () => {
    loading.value = true;
    try {
      const res = await tableDB.listRows({
        databaseId: db_Id,
        tableId: aboutTableId,
        queries: [],
      });
      return res.rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    createProject,
    loading,
    error,
    listProjects,
    deleteProject,
    editProject,
    createAbout,
    editAbout,
    listAbouts,
    deleteAboutSection,
    addStack,
    updateAboutProfile,
    getAboutProfile,
  };
};
