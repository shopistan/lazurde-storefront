const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "LazurdeHeroBanner",
  label: "Lazurde Hero Banner",
  description: ``,

  attributes: {
    heroImage: Types.Image({
      label: "Hero Image",
      url: Types.String({ label: "URL" }),
      altText: Types.String({ label: "Alt text" }),
    }),
  },
});
