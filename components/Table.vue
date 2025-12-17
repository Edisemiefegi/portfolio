<template>
  <div
    v-bind="$attrs"
    class="overflow-x-auto w-full bg-white rounded-xl border border-gray-200 shadow-md"
  >
    <slot name="header" />
    <table class="table-auto w-full">
      <thead>
        <tr class="text-left text-gray-600 border-b border-gray-300">
          <th
            v-for="(col, index) in headers"
            :key="`${index}-${col?.field}`"
            :class="col?.headerClass"
            class="p-6 font-medium"
          >
            {{ col?.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="`${index}-${item?.[uniqueId]}`"
          :class="[]"
          class="hover:bg-gray-50 transition border-b border-gray-300"
        >
          <td
            v-for="(col, colIndex) in headers"
            :key="`${index}-${colIndex}-${col?.field}`"
            class="p-4 align-top"
          >
            <slot
              :name="col?.slot"
              :row="item"
              :index="index"
              :field="getField(col.field, item)"
            >
              {{
                col?.format
                  ? col?.format(getField(col.field, item), item, index)
                  : getField(col.field, item)
              }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="w-full te" v-if="!data?.length">
      <slot name="empty">
        <p :class="emptyClass" class="p-4 text-center">Empty</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  uniqueId: {
    type: String,
    required: true,
    default: "id",
  },
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  emptyClass: String
});

//headers
// title:String;
// feild:String;∏
// headerClass:string
// class:string;
// format: field, col, index
//slot

//user.name

const getField = (fieldName, row) => {
  if (!fieldName) return "";
  const arr = fieldName?.split(".");

  if (arr?.length > 1) {
    const firstField = arr?.[0];
    const firstObject = row?.[firstField];
    const restField = arr?.splice(1)?.join(".");
    return getField(restField, firstObject);
  } else {
    const field = arr?.[0];
    return row?.[field] || "";
  }
};

// const randomColors = [
//   { bg: "bg-red-100", text: "text-red-700" },
//   { bg: "bg-green-100", text: "text-green-700" },
//   { bg: "bg-blue-100", text: "text-blue-700" },
//   { bg: "bg-purple-100", text: "text-purple-700" },
//   { bg: "bg-yellow-100", text: "text-yellow-700" },
//   { bg: "bg-pink-100", text: "text-pink-700" },
//   { bg: "bg-indigo-100", text: "text-indigo-700" },
// ];

// const colorMap = ref({});

// function getColorFor(tech) {
//   if (!colorMap.value[tech]) {
//     const random =
//       randomColors[Math.floor(Math.random() * randomColors.length)];
//     colorMap.value[tech] = random;
//   }
//   return colorMap.value[tech];
// }
</script>

<style lang="scss" scoped></style>
