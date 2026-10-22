import { tableDB, storage, ID } from "../utils/appwrite";

export const DB_ID = "692c73d700038ff2f45a";
export const BUCKET_ID = "projectImages";
export const TABLES = {
  projects: "projects",
  experiences: "about",
  profile: "about_profile",
  skills: "skills",
};

// Appwrite rejects rows containing columns that don't exist on the table.
// We retry with only the columns it accepts and report the ones you still need to add.
const unknownColumn = (err) => {
  const m = String(err?.message || "").match(/Unknown attribute: "?([\w-]+)"?/i);
  return m ? m[1] : null;
};

const writeRow = async (fn, data, skipped = []) => {
  try {
    const row = await fn(data);
    return { row, skipped };
  } catch (err) {
    const col = unknownColumn(err);
    if (!col || !(col in data)) throw err;
    const { [col]: _, ...rest } = data;
    if (!Object.keys(rest).length) throw new Error(`Table is missing columns: ${[...skipped, col].join(", ")}`);
    return writeRow(fn, rest, [...skipped, col]);
  }
};

export const fileUrl = (id) => {
  if (!id) return "";
  if (/^(https?:|\/|data:|blob:)/.test(id)) return id;
  return storage.getFileView({ bucketId: BUCKET_ID, fileId: id }).toString();
};

export const useAdmin = () => {
  const loading = ref(false);
  const error = ref(null);

  const run = async (fn) => {
    loading.value = true;
    error.value = null;
    try {
      return await fn();
    } catch (err) {
      error.value = err?.message || "Something went wrong";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const list = (table) =>
    run(async () => {
      const res = await tableDB.listRows({ databaseId: DB_ID, tableId: TABLES[table] });
      return res.rows;
    });

  const create = (table, data) =>
    run(() =>
      writeRow(
        (d) => tableDB.createRow({ databaseId: DB_ID, tableId: TABLES[table], rowId: ID.unique(), data: d }),
        data,
      ),
    );

  const update = (table, id, data) =>
    run(() =>
      writeRow(
        (d) => tableDB.updateRow({ databaseId: DB_ID, tableId: TABLES[table], rowId: id, data: d }),
        data,
      ),
    );

  const remove = (table, id) =>
    run(() => tableDB.deleteRow({ databaseId: DB_ID, tableId: TABLES[table], rowId: id }));

  const uploadImage = (file) =>
    run(async () => {
      const uploaded = await storage.createFile({ bucketId: BUCKET_ID, fileId: ID.unique(), file });
      return uploaded.$id;
    });

  // Keeps only the fields we own, so Appwrite system fields ($id, $createdAt...) are never written back.
  const pick = (obj, keys) => Object.fromEntries(keys.filter((k) => obj[k] !== undefined).map((k) => [k, obj[k]]));

  return { loading, error, list, create, update, remove, uploadImage, pick };
};
