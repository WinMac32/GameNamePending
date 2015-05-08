# GameNamePending
An awesome new Roguelike written in Javascript.

## Developing & Building
We don't use any new-fangled Javascript build system or anything like that. This makes "building" less of a headache. We do use RequireJS to manage Javascript modules, but this is purely client side.

To run the game, you will require a local web server. For testing, I recommend XAMPP, as it's simple to set up and will do everything required. Grab that here: https://www.apachefriends.org/index.html

Other options include WAMP on Windows, or a standard apache installation on Linux. Further instruction will assume a XAMPP installation, but the method is more or less the same for most configurations.

After XAMPP is up and running, you have 2 options:
1. (easy) clone the git repository directly into the XAMPP htdocs directory and work out of there.
2. (more config) set up an apache alias to point to another location where the local repo is located.

Then, while the web server is running, simply navigate to http://localhost/folder-of-repo
