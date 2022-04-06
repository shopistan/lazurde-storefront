const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "Header",
    label: "Header",
    description: ``,
    isGlobal: true,

    attributes: {
        promoTitle: Types.String({ label: 'Promo bar title' }),
        promoLinkText: Types.String({ label: 'Promo bar link text' }),
        mobilePromoLinkText: Types.String({ label: 'Mobile Promo bar link text' }),
        promoLink: Types.String({ label: 'Promo bar link' })
    },
});
