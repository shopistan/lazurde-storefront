const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "LazurdeHeroBanner",
  label: "Lazurde Hero Banner",
  description: ``,

  attributes: {
    backgroundImage: Types.Image({
      label: "Background Image",
      imageUrl: Types.String({ label: "URL" }),
      altText: Types.String({ label: "Alt text" }),
    }),
    bannerText: Types.String({ label: 'Hero Banner Text' }),
    buttonText: Types.String({ label: 'Button Text' }),
    buttonLink: Types.String({ label: 'Button Link' })
  },
});
