const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "CardSlider",
  label: "Cards Slider",
  description: ``,
  isGlobal: false,

  attributes: {
    sectionHeading: Types.String({ label: "Section Heading" }),
    bgColor: Types.String({ label: "Section Background Color" }),

    cards: Types.Array({
      label: "Slides",
      children: Types.Shape({
        children: {
          heading: Types.String({ label: "Slide Heading" }),
          slideLink: Types.String({ label: "Slide Link" }),
          image: Types.Image({
            label: "Slide Image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
        },
      }),
    }),
  },
});
