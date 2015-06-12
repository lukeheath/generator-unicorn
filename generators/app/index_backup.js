'use strict';
var yeoman = require('yeoman-generator');
var colors = require('colors');
var yosay = require('yosay');
var generateName = require('sillyname');
var sillyName = generateName().split(' ');
var thisUnicornName = sillyName[0];

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the mesmerizing ' + 'Unicorn'.rainbow + ' generator! Searching for the perfect seed.'
    ));

    var prompts = [{
      type: 'input',
      name: 'unicornName',
      message: 'What is the name of your unicorn?',
      default: thisUnicornName
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      // To access props later use this.props.someOption;
      // like so:
      this.unicornName = props.unicornName;

      done();

    }.bind(this));
  },

  writing: {
    build: function () {

      this.log("Behold! Something majestic is being born!");

      this.fs.copy(
        this.templatePath('.bowerrc'),
        this.destinationPath('.bowerrc')
      );

      this.fs.copy(
        this.templatePath('.editorconfig'),
        this.destinationPath('.editorconfig')
      );

      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copy(
        this.templatePath('.sailsrc'),
        this.destinationPath('.sailsrc')
      );

      var context = {
        unicornName: this.unicornName
      };

      this.fs.template(
        this.templatePath('/'),
        this.destinationPath('/'),
        context
      );

    },

    replace: function () {

      // replace({
      //   regex: "Unicorn",
      //   replacement: thisUnicornName,
      //   paths: ['/'],
      //   recursive: true,
      //   silent: false,
      // });
    }
  },

  install: function () {
    this.installDependencies();
    this.log("And its name is " + thisUnicornName.rainbow + "!");
  }
});
