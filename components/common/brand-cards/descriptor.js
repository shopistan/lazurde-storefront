const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "BrandCards",
  label: "Brand Cards",
  description: ``,

  attributes: {
    heading: Types.String({ label: "Section Heading" }),
    exploreBrandsArray: Types.Array({
      label: "Brand Cards",
      children: Types.Shape({
        children: {
          cardImage: Types.Image({
            label: "Card Image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
          cardTitle: Types.String({ label: "Card Title" }),
        },
      }),
    }),
  },
});
