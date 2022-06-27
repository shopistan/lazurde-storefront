const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "FilterBar",
  label: "Global Filter Bar",
  description: ``,

  attributes: {
    filterList: Types.Array({
      label: "Filters",
      children: Types.Shape({
        children: {
          filterName: Types.String({ label: "Filter Name" }),
          filterOptions: Types.Array({
            label: "Filter Options",
            children: Types.Shape({
              children: {
                optionName: Types.String({ label: "Option Name" }),
              },
            }),
          }),
        },
      }),
    }),
    attributeFilters: Types.Array({
      label: "Attribute Filters",
      children: Types.Shape({
        children: {
          attributeName: Types.String({ label: "Attribute Name" }),
          attributeValue: Types.String({ label: "Attribute Value" }),
        },
      }),
    }),
    applyAttributeFilters: Types.Boolean({ label: "Apply Attribute Filters?" }),
  },
});
