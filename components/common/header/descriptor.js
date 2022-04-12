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
    siteLogo: Types.Image({
      label: "Site Logo",
      url: Types.String({ label: "URL" }),
      altText: Types.String({ label: "Alt text" }),
    }),

    siteNavBar: Types.Array({
      label: "Navigation Links",
      children: Types.Shape({
        children: {
          navTitles: Types.String({ label: "Navigation Titles" }),
          links: Types.Array({
            label: "navArr",
            children: Types.Shape({
              children: {
                title: Types.String({ label: "Category Heading" }),
                links: Types.Array({
                  label: "catArr",
                  children: Types.Shape({
                    children: {
                      title: Types.String({ label: "Title" }),
                      url: Types.String({ label: "URL" }),
                    },
                  }),
                }),
              },
            }),
          }),
        },
      }),
    }),
  },
});
