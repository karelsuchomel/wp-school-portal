# How to add new Gutenberg blocks

1. Define new block type in the /php/load-editor-blocks.php file like this

```php
register_block_type( 'school-portal/hero-card', array(
    'editor_script' => 'sp-editor-blocks-js',
    'editor_style' => 'sp-editor-blocks-styles',
) );
```

2. Create a new .jxs file in the /js/editor-blocks directory like this. Use the
   same name you used when registering the block in the previous step.

```javascript
wp.blocks.registerBlockType("school-portal/hero-card", {
  title: "Hero card",
  icon: "smiley",
  category: "common",
  attributes: {
    headerContent: {
      type: "string",
    },
  },
  edit: (props) => {
    // Destructuring
    const {
      attributes: {
        mediaID,
        mediaURL,
      },
    } = props;

    const updateHeader = (newContent) => {
      props.setAttributes({
        headerContent: newContent,
      });
    };

    return (
      <div className={props.className}>
        <div className="image-wrapper">
          <wp.blockEditor.MediaUpload
            onSelect={onSelectImage}
            allowedTypes="image"
            value={mediaID}
            render={({ open }) => (
              <wp.components.Button
                className={mediaID ? "image-button" : "button button-large"}
                onClick={open}
              >
                {!mediaID
                  ? "Upload Image"
                  : <img src={mediaURL} alt="Upload Recipe Image" />}
              </wp.components.Button>
            )}
          />
        </div>
      </div>
    );
  },
  save: (props) => {
    return (
      <div>
        <div className="image-wrapper">
          {props.attributes.mediaURL &&
            (
              <img
                className="recipe-image"
                src={props.attributes.mediaURL}
                alt="Recipe Image"
              />
            )}
        </div>
      </div>
    );
  },
});
```

3. Import newly created JavaScript file in the editor-blocks.jsx file (found in
   the same directory)
4. Create new SCSS files with your styles for the editor and the final rendering
5. Import those SCSS files in the index.scss for rendered styles and
   editor-blocks.scss for editor styling
