const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "BambuserPopup",
    label: "Bambuser Popup",
    description: ``,

    attributes: {
        bId: Types.String({ label: 'Bambuser Id' }),
        btnText: Types.String({ label: 'Button text' }),
    },
});
