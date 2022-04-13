const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "BrandsCard",
  label: "Explore Brands",
  description: ``,

  attributes: {
    heading: Types.String({ label: "Heading" }),
    exploreBrandsArray: Types.Array({
      label: "Explore Brands",
      children: Types.Shape({
        children: {
          cardImage: Types.Image({
            label: "card Image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
          cardTitle: Types.String({ label: "Title" }),
        },
      }),
    }),
  },
});