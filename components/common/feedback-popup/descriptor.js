const { Types } = require("@teamfabric/xpm");

exports.default = Types.Component({
    id: "FeedbackPopUp",
    label: "Feedback PopUp",
    description: ``,
    isGlobal: false,

    attributes: {
        heading: Types.String({ label: 'heading' }),
        buttonText: Types.String({ label: 'buttonText' }),
        firstNameText: Types.String({ label: 'firstNameText' }),
        firstNameInput: Types.String({ label: 'firstNameInput' }),
        lastNameText: Types.String({ label: 'lastNameText' }),
        lastNameInput: Types.String({ label: 'lastNameInput' }),
        emailText: Types.String({ label: 'emailText' }),
        emailInput: Types.String({ label: 'emailInput' }),
        mobileNumberText: Types.String({ label: 'mobileNumberText' }),
        mobileNumberInput: Types.String({ label: 'mobileNumberInput' }),
        feedbackText: Types.String({ label: 'feedbackText' }),
        feedbackInput: Types.String({ label: 'feedbackInput' }),
    },
});
