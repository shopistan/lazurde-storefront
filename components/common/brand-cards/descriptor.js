const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "BrandCards",
  label: "Brand Cards",
  description: ``,

  attributes: {
    heading: Types.String({ label: "Section Heading" }),
    brandCards: Types.Array({
      label: "Brand Cards",
      children: Types.Shape({
        children: {
          cardImage: Types.Image({
            label: "Card Image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
          favIconSrc : Types.Image({
            label : 'Fav Icon',
            url : Types.String({label : 'Fav Icon URL'}),
            altText : Types.String({label : 'Alt Text'}),
          }),
          cardTitle: Types.String({ label: "Card Title" }),
          cardLinks : Types.String({label : "Card Links"}),
        },
      }),
    }),
  },
});
