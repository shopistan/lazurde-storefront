const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "PLPCategory",
  label: "PLPCategory",
  description: ``,

  attributes: {
    title: Types.String({ label: "PLP Category Heading" }),
    text: Types.String({ label: 'PLP Category Text' }),
    isLeft: Types.Boolean({ label: 'Is Left' }),
    isCentre: Types.Boolean({ label: 'Is Center' }),
    isRight: Types.Boolean({ label: 'Is Right' }),
    cards: Types.Array({
      label: "Brand Cards",
      children: Types.Shape({
        children: {
          cardImage: Types.Image({
            label: "Card Image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
          cardTitle: Types.String({ label: "Card Title" }),
          cardLink: Types.String({ label: 'Category Link' }),
        },
      }),
    }),
  },
});
