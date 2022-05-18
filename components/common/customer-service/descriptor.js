const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "Footer",
    label: "Footer",
    description: ``,
    isGlobal: true,

    attributes: {
        bannerImage: Types.Image({ label: 'Banner Image', url: Types.String({ label: 'URL' }), altText: Types.String({ label: 'Alt Text' }) }),
        heading: Types.String({ label: 'Heading' }),
        inputIcon: Types.Image({ label: 'Input Icon', url: Types.String({ label: 'URL' }), altText: Types.String({ label: 'Alt Text' }) }),
        services: Types.Array({
            label: 'Services',
            children: Types.Shape({
                children: {
                    title: Types.String({ label: 'Title' }),
                    icon: Types.Image({ label: 'Icon', url: Types.String({ label: 'URL' }), altText: Types.String({ label: 'Alt Text' }) }),
                    iconTitle: Types.String({ label: 'Icon Title' }),
                    iconText: Types.String({ label: 'Icon Text' }),
                }
            }),
        })
    },
});
