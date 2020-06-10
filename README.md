# Bootstrap4 - sass - gulp - Boilerplate

A boilerplate to be used as a base for any project built with [Bootstrap 4](https://getbootstrap.com) & [Sass](https://sass-lang.com).
Also added [Browsersync](https://www.browsersync.io) and [Gulp.js](https://gulpjs.com/) for autoprefixing, concatenating, sourcemap creation, live reloading, minification and building.

## How to set the repo

* clone this repo

* `cd` into the repo

* `yarn` - install dependencies

* `yarn gulp dev` - to run tasks


## Gulp Tasks

* `yarn gulp` - Default task used to compile Sass, concatenate CSS & JS files, create sourcemaps & pull dependencies

* `yarn gulp dev` - Task that run Browsersync to reload the page everytime any changes made

* `yarn gulp dist` - Builds everything and moves it into **dist** folder for production

## License

[MIT](https://github.com/marcogregorin/bootstrap4-sass-gulp-boilerplate/blob/master/LICENSE)
