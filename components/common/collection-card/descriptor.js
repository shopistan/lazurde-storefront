const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "CollectionCard",
  label: "Explore our collection",
  description: ``,

  attributes: {
    collectionCard: Types.Array({
      label: "collection card",
      children: Types.Shape({
        children: {
            collectionImage: Types.Image({
            label: "collection card image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
          collectionImageKenaz: Types.Image({
            label: "collection card image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
          collectionImageMissl: Types.Image({
            label: "collection card image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
          }),
          collectionbutton: Types.String({ label: "Button Text" }),
          collectiontitle : Types.String({label : "Title"}),
          collectiontext : Types.String({label : "Text"}),
          collectionButtonLink : Types.String({ label : 'Button Link'}),
          
        },
      }),
    }),
  },
});