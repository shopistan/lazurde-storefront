const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "RegisterModal",
    label: "RegisterModal",
    description: ``,

    attributes: {
        modalImage: Types.Image({
            label: 'Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt Text' }),
        }),
        isOpen: Types.Boolean({ label: 'is Open or Close' }),
        modalTitle: Types.String({ label: 'Title' }),
        modalText: Types.String({ label: 'Text' }),
        modalButton: Types.String({ label: 'Button Text' }),
    },
});
