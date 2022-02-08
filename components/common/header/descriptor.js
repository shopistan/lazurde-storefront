const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "Header",
    label: "Header",
    description: ``,
    isGlobal: true,

    attributes: {
        brandImage: Types.Image({
            label: "Brand Image",
            url: Types.String({ label: "URL" }),
            altText: Types.String({ label: "Alt text" }),
        }),
        navLinks: Types.Array({
            label: 'Navigation Links',
            children: Types.Shape({
                children: {
                    url: Types.String({ label: 'URL' }),
                    linkText: Types.String({ label: 'Link Text' }),
                }
            })
        })
    },
});
