const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "BambuserEndedSessions",
    label: "Bambuser Ended Sessions",
    description: ``,

    attributes: {
        channelId: Types.String({ label: 'Channel Id' }),
    },
});
