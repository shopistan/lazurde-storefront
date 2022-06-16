const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'CGIR',
  label: 'CGIR',
  description: ``,

  attributes: {
    cgirPages: Types.Array({
      label: 'CGIR Pages',
      children: Types.Shape({
        children: {
          moreContent: Types.Array({
            label: 'More Content',
            children: Types.Shape({
              children: {
                heading: Types.String({ label: 'Heading' }),
                text: Types.RichText({ label: 'Paragraph' }),
                image: Types.Image({
                  label: 'Image',
                  url: Types.String({ label: 'URL' }),
                  altText: Types.String({ label: 'Alt Text' })
                }),
                imageTitle: Types.String({ label: 'Image Title' }),
                pdfUrl: Types.String({ label: 'PDF URL' })
              }
            })
          }),
          name: Types.String({ label: 'Name' }),
          content: Types.RichText({ label: 'Content' }),
          icon: Types.Image({
            label: 'Icon',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt Text' })
          }),
          width: Types.Number({ label: 'Icon Width' }),
          height: Types.Number({ label: 'Icon Height' }),
          pageUrl: Types.String({ label: 'Page Url' })
        }
      })
    }),
    sideBarBgcolor: Types.String({ label: 'Content Block Background Color' }),
    contentBgcolor: Types.String({ label: 'Content Block Background Color' }),
    title: Types.String({ label: 'Title' })
  }
})
