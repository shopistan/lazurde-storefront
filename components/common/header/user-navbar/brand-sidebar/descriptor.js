const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "BrandSideBar",
  label: "Brand Sidebar",
  description: ``,
  isGlobal: true,

  attributes: {
    mainImg: Types.Image({
      label: "Main Logo Image",
      url: Types.String({ label: "URL" }),
      altText: Types.String({ label: "Alt text" }),
    }),
    mainTitle: Types.String({ label: "Main Title" }),

    logoArr: Types.Array({
      label: "Logos",
      children: Types.Shape({
        children: {
          logoImg: Types.Image({
            label: "Logo Image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
        },
      }),
    }),

    brandArr: Types.Array({
      label: "Brand Images",
      children: Types.Shape({
        children: {
          brandImg: Types.Image({
            label: "Brand Image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
          label: Types.String({ label: "Brand Title" }),
          labelUrl: Types.String({ label: "Brand Title link" }),
        },
      }),
    }),
  },
});
