const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "Footer",
    label: "Footer",
    description: ``,
    isGlobal: true,

    attributes: {
        footerLinks: Types.Array({
            label: 'Footer Links',
            children: Types.Shape({
                children: {
                    url: Types.String({ label: 'URL' }),
                    linkText: Types.String({ label: 'Link Text' }),
                }
            })
        })
    },
});
