const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "BambuserCardSlider",
  label: "Bambuser Cards Slider",
  description: ``,
  isGlobal: false,

  attributes: {
    sectionHeading: Types.String({ label: "Section Heading" }),
    bgColor: Types.String({ label: "Section Background Color" }),

    cards: Types.Array({
      label: "Bambuser Slides",
      children: Types.Shape({
        children: {
          heading: Types.String({ label: "Slide Heading" }),
          description: Types.String({ label: "Slide Description" }),
          btnText: Types.String({ label: "Slide Button Text" }),
          bambuserId: Types.String({ label: "Slide Bambuser ID" }),
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
