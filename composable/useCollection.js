import { useAdmin } from "./useAdmin";
import { useToast, reportSkipped } from "./useToast";

// Shared list/create/edit/delete logic for the dashboard pages.
// `fields` are the columns we write; `blank` builds an empty form; `seed` is the default content to import.
export const useCollection = (table, { fields, blank, seed = [] }) => {
  const api = useAdmin();
  const toast = useToast();
  const rows = ref([]);
  const form = ref(blank());
  const editingId = ref(null);
  const drawer = ref(false);
  const ready = ref(false);

  const sorted = computed(() =>
    [...rows.value].sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || new Date(a.$createdAt) - new Date(b.$createdAt)),
  );

  const refresh = async () => {
    try {
      rows.value = await api.list(table);
    } catch (e) {
      toast.error(`Couldn't load ${table}: ${e.message}`);
    } finally {
      ready.value = true;
    }
  };

  const openNew = () => {
    editingId.value = null;
    form.value = { ...blank(), order: rows.value.length };
    drawer.value = true;
  };

  const openEdit = (row) => {
    editingId.value = row.$id;
    form.value = { ...blank(), ...JSON.parse(JSON.stringify(api.pick(row, [...fields, "order"]))) };
    drawer.value = true;
  };

  const save = async (data = form.value) => {
    try {
      const payload = api.pick(data, [...fields, "order"]);
      const { skipped } = editingId.value
        ? await api.update(table, editingId.value, payload)
        : await api.create(table, payload);
      reportSkipped(toast, skipped, table);
      drawer.value = false;
      await refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const remove = async (row, label = "this item") => {
    if (!confirm(`Delete ${label}? This can't be undone.`)) return;
    try {
      await api.remove(table, row.$id);
      toast.success("Deleted");
      await refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  // swap order with neighbour
  const move = async (row, dir) => {
    const list = sorted.value;
    const i = list.indexOf(row);
    const other = list[i + dir];
    if (!other) return;
    try {
      await Promise.all([api.update(table, row.$id, { order: i + dir }), api.update(table, other.$id, { order: i })]);
      await refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const importSeed = async () => {
    if (!confirm(`Import ${seed.length} items from the current site into Appwrite?`)) return;
    let skipped = [];
    try {
      for (const [i, item] of seed.entries()) {
        const res = await api.create(table, api.pick({ ...item, order: i }, [...fields, "order"]));
        skipped = res.skipped;
      }
      reportSkipped(toast, skipped, table);
      await refresh();
    } catch (e) {
      toast.error(e.message);
    }
  };

  onMounted(refresh);

  return { api, toast, rows, sorted, form, editingId, drawer, ready, refresh, openNew, openEdit, save, remove, move, importSeed };
};
