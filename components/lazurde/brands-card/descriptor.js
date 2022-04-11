const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "BrandsCard",
  label: "Explore Brands",
  description: ``,

  attributes: {
    exploreBrandsArray: Types.Array({
      label: "Explore Brands",
      children: Types.Shape({
        children: {
          backGroundImage: Types.Image({
            label: "Background Image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
          title: Types.String({ label: "Title" }),
        },
      }),
    }),
  },
});
