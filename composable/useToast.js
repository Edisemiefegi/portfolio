// Tiny global toast used across the admin dashboard.
export const useToast = () => {
  const toast = useState("admin-toast", () => null);
  let timer;
  const show = (message, type = "success", ms = 3000) => {
    clearTimeout(timer);
    toast.value = { message, type };
    timer = setTimeout(() => (toast.value = null), ms);
  };
  return { toast, success: (m) => show(m), error: (m) => show(m, "error", 6000), warn: (m) => show(m, "warn", 8000) };
};

// Explains columns Appwrite rejected so they can be added in the console.
export const reportSkipped = (toast, skipped, table) => {
  if (skipped?.length) toast.warn(`Saved, but "${table}" has no column(s): ${skipped.join(", ")}. Add them in Appwrite to store these fields.`);
  else toast.success("Saved");
};
