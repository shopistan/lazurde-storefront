const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'InThePress',
  label: 'In The Press',
  description: ``,
  isGlobal: false,

  attributes: {
    bannerImage: Types.Image({
      label: 'Banner Image',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt Text' })
    }),
    heading: Types.String({ label: 'Heading' }),
    stories: Types.Array({
      label: 'Stories',
      children: Types.Shape({
        children: {
          storyImage: Types.Image({
            label: 'Story Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt Text' })
          }),
          storyTitle: Types.String({ label: 'Story Title' }),
          storyHeading: Types.String({ label: 'Story Heading' }),
          storyDescription: Types.RichText({ label: 'Stroy Description' })
        }
      })
    })
  }
})
