( function ( blocks, blockEditor, components ) {
    const RichText = blockEditor.RichText;
    const AlignmentToolbar = blockEditor.AlignmentToolbar;
    const BlockControls = blockEditor.BlockControls;
    const MediaUpload = blockEditor.MediaUpload;
    const Button = components.Button;

    blocks.registerBlockType( 'school-portal/hero-card', {
        title: 'Hero card',
        icon: 'smiley',
        category: 'common',
        attributes: {
            headerContent: {
                type: 'string'
            },
            textContent: {
                type: 'string'
            },
            buttonContent: {
                type: 'string',
            },
            mediaID: {
                type: 'number',
            },
            mediaURL: {
                type: 'string',
                source: 'attribute',
                selector: 'img',
                attribute: 'src',
            },
            alignment: {
                type: 'string',
                default: 'none',
            },
        },
        edit: ({ attributes, setAttributes, className }) => {
            const updateHeader = (newContent) => {
                setAttributes({
                    headerContent: newContent
                });
            };

            const updateText = (newContent) => {
                setAttributes({
                    textContent: newContent
                });
            };

            const updateButton = (newContent) => {
                setAttributes({
                    buttonContent: newContent
                });
            };

            const onSelectImage = ( media ) => {
                setAttributes( {
                    mediaURL: media.url,
                    mediaID: media.id,
                } );
            };

            const onChangeAlignment = ( newAlignment ) => {
                setAttributes( {
                    alignment: newAlignment === undefined ? 'none' : newAlignment,
                } );
            };

            return (
                <div className={ className } >
                    <BlockControls>
                        <AlignmentToolbar
                            value={ attributes.alignment }
                            onChange={ onChangeAlignment }
                        />
                    </BlockControls>
                    <div className="image-wrapper">
                        <MediaUpload
                            onSelect={ onSelectImage }
                            allowedTypes="image"
                            value={ attributes.mediaID }
                            render={ ( { open } ) => (
                                <Button className={ attributes.mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
                                    { ! attributes.mediaID ? 'Upload Image' : <img src={ attributes.mediaURL } alt='Upload Recipe Image' /> }
                                </Button>
                            ) }
                        />
                    </div>
                    <div className="text-card">
                        <div className="text-wrapper">
                            <RichText
                                tagName="h1"
                                onChange={ updateHeader }
                                value={ attributes.headerContent }
                                placeholder="Headline"
                            />
                            <RichText
                                tagName="p"
                                onChange={ updateText }
                                value={ attributes.textContent }
                                placeholder="More details"
                            />
                            <RichText
                                tagName="a"
                                className="wp-block-button__link"
                                onChange={ updateButton }
                                value={ attributes.buttonContent }
                                placeholder="Button text"
                            />
                        </div>
                    </div>
                </div>
            );
        },
        save: ({ attributes }) => {
            return (
                <div>
                    <div className="image-wrapper">
                        {
                            attributes.mediaURL && (
                                <img className="recipe-image" src={ attributes.mediaURL } alt='Recipe Image' />
                            )
                        }
                    </div>
                    <div className="text-card">
                        <div className="text-wrapper">
                            <RichText.Content
                                tagName="h1"
                                value={ attributes.headerContent }
                            />
                            <RichText.Content
                                tagName="p"
                                value={ attributes.textContent }
                            />
                            <RichText.Content
                                tagName="div"
                                value={ attributes.buttonContent }
                            />
                        </div>
                    </div>
                </div>
            );
        },
    } );

} )( window.wp.blocks, window.wp.blockEditor, window.wp.components );