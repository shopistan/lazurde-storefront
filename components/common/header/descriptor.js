const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "Header",
    label: "Header",
    description: ``,
    isGlobal: true,

    attributes: {
        promoTitle: Types.String({ label: 'promobar title' }),
        promoLinkText: Types.String({ label: 'promobar link text' }),
        promoLink: Types.String({ label: 'promobar link' })
    },
});
