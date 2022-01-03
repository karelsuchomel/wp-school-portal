# Research: could we only use vanilla CSS?

**TLDR;**
We should use both and take advantage of these technologies.

Vanilla CSS: 
- [All the things we can (and should) do without SASS](#all-the-things-we-can-(and-should)-do-without-SASS)
- [Color themes (light/dark/custom)](#color-themes-(light/dark/custom))
- No required dev boilerplate, but some features are only available in newer browsers

SASS:
- [Loading just one file vs loading a lots of files](#loading-just-one-file-vs-loading-a-lots-of-files)
- [SASS "use" keyword](#sass-use-keyword)
- [Syntax sugar](#syntax-sugar)
- [SASS helps you write more DRY code](#sass-helps-you-write-more-dry-code)
- [SASS can detect invalid styles](#sass-can-detect-invalid-styles)
- [SASS variables](#sass-variables)

## All the things we can (and should) do without SASS  
- Build layout with Grid + flexbox. We can define layouts without any need for complicated SASS functions. 
- With css-variables (for color themes) 

## Color themes (light/dark/custom)
As it is now setup, our styles uses a lot of inheritance and want to be as least specific as can be. This has two outcomes.
1. With less specific styling, there is much less of the code.
2. Small change can potentially have a bing impact on the whole design. This is both bad and a good thing.
   **Bad thing:** you can break much more stuff with a little change.
   **Good Thing:** you can switch themes without using extensive amount of CSS variables, just by altering some base styling of font colors and backgrounds.

## Loading just one file vs loading a lots of files
New HTTP protocol enables us to largely mitigate the negative effect of having to load a lot of individual files from server to client. It basically assumes that the client will need these files anyway and sends the right away without waiting for the client to request them.
Question is, if we want to have links to many CSS files in our HTML. It doesn't add any benefit to us. We need to load all the styling anyway, because we have to be prepared for all eventual block-types the user can create with the block-editor.

## SASS "use" keyword
It's an implementation of imports and scoped SASS styling. This has a great benefit, because you can more easily understand the dependence of  the current file to others.

## Syntax sugar
It's more readable and easier to write. Especially when it comes to media queries.

## SASS helps you write more DRY code
Yes it does, with its functions, includes and extends. Useful for elaborate calculations like *responsive font sizes* or *responsive page gutter*.

## SASS can detect invalid styles
Validation is always good.

## SASS variables
SASS variables are different from CSS-variables, because they are calculated when the preprocessor runs. This has an obvious disadvantage (cannot change the variable after it is processed), but also an advantage because some calculations do not need to be calculated on the client, and thus, this saves some effort on the client.
