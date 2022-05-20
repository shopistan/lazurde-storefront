const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "TermCondtion",
    label: "TermCondtion",
    description: ``,

    attributes: {
        hyperLinks: Types.Array({
            label: 'HyperLink Array',
            children: Types.Shape({
                children: {
                    name: Types.String({ label: 'Hyperlink Name' }),
                    content: Types.RichText({ label: 'Hyperlink Content' }),
                }
            })
        }),
        sideBarBgcolor: Types.String({ label: 'Content Block Background Color' }),
        contentBgcolor: Types.String({ label: 'Content Block Background Color' }),
        icon: Types.Image({
            label: 'Icon',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt Text' }),
        }),
        accordion: Types.Array({
            label: 'Accordion Array',
            children: Types.Shape({
                children: {
                    heading: Types.String({ label: 'Question ' }),
                    text: Types.RichText({ label: 'Answer' })
                }
            })
        }),
        title: Types.String({ label: 'Title' })
    },
});
