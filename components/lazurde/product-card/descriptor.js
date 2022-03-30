const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "ProductCard",
  label: "ProductCard",
  description: ``,

  attributes: {
    image: Types.Image({
      label: "Card Image",
      url: Types.String({ label: "URL" }),
      altText: Types.String({ label: "Alt text" }),
    }),
    title: Types.String({ label: 'Card Title' }),
    description: Types.String({ label: 'Card Description' }),
    price: Types.String({ label: 'Card Price' })
  },
});
