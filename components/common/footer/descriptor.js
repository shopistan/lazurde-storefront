const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "Footer",
  label: "Footer",
  description: ``,
  isGlobal: true,

  attributes: {
    heading: Types.String({ label: "Heading" }),
    subHeading: Types.String({ label: "Sub Heading" }),
    subscriptionText: Types.String({ label: "Subscription Text" }),
    socialIconText: Types.String({ label: "Social Icon Text" }),
    footerLogoLink: Types.String({ label: "Footer Logo Link" }),
    footerLogo: Types.Image({
      label: "Footer Logo",
      url: Types.String({ label: "URL" }),
      altText: Types.String({ label: "Alt text" }),
    }),

    footerLinks: Types.Array({
      label: "Footer Links",
      children: Types.Shape({
        children: {
          linkHeading: Types.String({ label: "Links heading" }),
          links: Types.Array({
            label: "Links",
            children: Types.Shape({
              children: {
                text: Types.String({ label: "Title" }),
                url: Types.String({ label: "URL" }),
              },
            }),
          }),
        },
      }),
    }),

    socialLinks: Types.Array({
      label: "Social Links",
      children: Types.Shape({
        children: {
          link: Types.String({ label: "Url" }),
          icon: Types.Image({
            label: "logo",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
            width: Types.String({ label: "Icon Width" }),
            mobileWidth: Types.String({ label: "Icon Mobile Width" }),
          }),
        },
      }),
    }),
    paymentLinks: Types.Array({
      label: "Payment Links",
      children: Types.Shape({
        children: {
          link: Types.String({ label: "Url" }),
          icon: Types.Image({
            label: "logo",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
            width: Types.String({ label: "Icon Width" }),
            mobileWidth: Types.String({ label: "Icon Mobile Width" }),
          }),
        },
      }),
    }),
  },
});
