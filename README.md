# twig-to-jsx README

Converts a twig file into a jsx-ready syntax. Currently this is using some personalized twig tags so use at your own risk. I hope to add support for custom twig tags soon.

## Usage

In the command tool (ctrl + shift + p), type `Twig-to-jsx` and it will convert the current open file. (Only tested on twig file, use at your own risks on other extensions)

## Requirements

`jsx-control-statements` (https://www.npmjs.com/package/jsx-control-statements)

In order to keep the file structure as close to the original as possible, any control statement will be converted using the above npm package's syntax.

## Known Issues

Some app specific codes are still to be removed

## Release Notes

**1.0.0**

* Initial release
