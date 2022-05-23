const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "CustomerService",
    label: "Customer Service",
    description: ``,
    isGlobal: false,

    attributes: {
        bannerImage: Types.Image({ label: 'Banner Image', url: Types.String({ label: 'URL' }), altText: Types.String({ label: 'Alt Text' }) }),
        heading: Types.String({ label: 'Heading' }),
        inputIcon: Types.Image({ label: 'Input Icon', url: Types.String({ label: 'URL' }), altText: Types.String({ label: 'Alt Text' }) }),
        title: Types.String({ label: 'Title' }),
        services: Types.Array({
            label: 'Services',
            children: Types.Shape({
                children: {
                    icon: Types.Image({ label: 'Icon', url: Types.String({ label: 'URL' }), altText: Types.String({ label: 'Alt Text' }) }),
                    iconTitle: Types.String({ label: 'Icon Title' }),
                    iconText: Types.String({ label: 'Icon Text' }),
                    url: Types.String({ label: 'Redirect URL' }),
                    width: Types.String({ label: 'Icon Width' }),
                    height: Types.String({ label: 'Icon Height' })
                }
            }),
        })
    },
});
