const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "TermCondtion",
  label: "TermCondtion",
  description: ``,

  attributes: {
    hyperLinks: Types.Array({
      label: "HyperLink Array",
      children: Types.Shape({
        children: {
          accordion: Types.Array({
            label: "Accordion Array",
            children: Types.Shape({
              children: {
                heading: Types.String({ label: "Question " }),
                text: Types.RichText({ label: "Answer" }),
              },
            }),
          }),
          name: Types.String({ label: "Hyperlink Name" }),
          content: Types.RichText({ label: "Hyperlink Content" }),
          icon: Types.Image({
            label: "Icon",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt Text" }),
          }),
          width: Types.Number({ label: "Icon Width" }),
          height: Types.Number({ label: "Icon Height" }),
        },
      }),
    }),
    sideBarBgcolor: Types.String({ label: "Content Block Background Color" }),
    contentBgcolor: Types.String({ label: "Content Block Background Color" }),
    title: Types.String({ label: "Title" }),
  },
});
