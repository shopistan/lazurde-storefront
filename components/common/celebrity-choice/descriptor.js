const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'CelebrityChoice',
  label: 'Celebrity Choice',
  description: ``,
  isGlobal: false,

  attributes: {
    bannerImage: Types.Image({
      label: 'Banner Image',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt Text' })
    }),
    heading: Types.String({ label: 'Heading' }),
    celebrities: Types.Array({
      label: 'Celebrities',
      children: Types.Shape({
        children: {
          celebrityImage: Types.Image({
            label: 'Celebrity Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt Text' })
          }),
          celebritySign: Types.Image({
            label: 'Celebrity Sign',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt Text' })
          })
        }
      })
    }),
    detailsHeading: Types.String({ label: 'Details Heading' }),
    detailsDescription: Types.RichText({ label: 'Details Description' })
  }
})
