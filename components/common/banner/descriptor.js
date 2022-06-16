const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "Banner",
    label: "Banner",
    description: ``,

    attributes: {
        bgColor: Types.String({ label: 'Background Color' }),
        title: Types.String({ label: 'Title' }),
        text: Types.String({ label: 'Text' }),
        backgroundImage: Types.Image({
            label: 'Banner Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt Text' }),
        })
    },
});
