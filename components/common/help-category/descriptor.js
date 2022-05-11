const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "HelpCategory",
    label: "Help Category",
    description: ``,

    attributes: {
        mainImage: Types.Image({
            label: 'Main Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt Text' }),
        }),
        heading: Types.String({ label: 'Heading' }),
        categories: Types.Array({
            label: 'Category',
            children: Types.Shape({
                children: {
                    title: Types.String({ label: 'Title' }),
                    text: Types.String({ label: 'Text' }),
                    details: Types.String({ label: 'Details' }),
                    image: Types.Image({
                        label: 'Image',
                        url: Types.String({ label: 'URL' }),
                        altText: Types.String({ label: 'Alt Text' }),
                    }),
                    imageText: Types.String({ label: 'Image Text' }),
                    button: Types.String({ label: 'Button Text' }),
                    tNumber: Types.String({ label: 'Telephone Number' }),
                    vNumber: Types.String({ label: 'VAT Number' }),
                    crNumber: Types.String({ label: 'CR Number' }),
                    bgColor: Types.String({ label: 'Background Color' }),
                }
            })
        })
    },
});