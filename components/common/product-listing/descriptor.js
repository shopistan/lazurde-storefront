const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "ProductListing",
  label: "Product Listing Component",
  description: ``,

  attributes: {
    categoryName: Types.String({ label: "Category Name" }),
    pageName: Types.String({ label: 'Page Name' }),
  },
});
