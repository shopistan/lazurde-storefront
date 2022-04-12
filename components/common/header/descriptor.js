const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
  id: "Header",
  label: "Header",
  description: ``,
  isGlobal: true,

  attributes: {
    promoTitle: Types.String({ label: "Promo bar title" }),
    promoLinkText: Types.String({ label: "Promo bar link text" }),
    mobilePromoLinkText: Types.String({ label: "Mobile Promo bar link text" }),
    promoLink: Types.String({ label: "Promo bar link" }),

    footerLinks: Types.Array({
        label: "Footer Links",
        title: Types.String({ label: "Promo bar link" }),

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
  },
});
