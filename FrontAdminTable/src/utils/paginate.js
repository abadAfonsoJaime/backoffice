import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items) // convert the items to a lodash wrapper object in order to chain lodash methods
    .slice(startIndex) // copy the items array from the startIndex to...
    .take(pageSize) // Pick the items for the current page
    .value(); // Convert the lodash wrapper object to a regular array
}
