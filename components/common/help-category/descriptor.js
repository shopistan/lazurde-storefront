const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "CollectionCard",
    label: "Explore our collection",
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
                    contact: Types.String({ label: 'Text' }),
                    image: Types.Image({
                        label: 'Text',
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