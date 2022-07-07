const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "NewsletterSignup",
  label: "Newsletter Signup",
  description: ``,

  attributes: {
    backgroundImage: Types.Image({
      label: "Background Image",
      url: Types.String({ label: "URL" }),
      altText: Types.String({ label: "Alt text" }),
    }),
    bannerText: Types.String({ label: "Banner Heading" }),
    bannerBodyText: Types.String({ label: "Banner Text" }),
    heading: Types.String({ label: "Newsletter Heading" }),
    upperText: Types.String({ label: "Newsletter Description" }),
    lowerText: Types.String({ label: "Newsletter Text" }),
  },
});
