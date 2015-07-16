'use strict';
var util = require('util');
var path = require('path');
var _ = require('lodash');
var yeoman = require('yeoman-generator');
var colors = require('colors');
var yosay = require('yosay');
var generateName = require('sillyname');
var sillyName = generateName().split(' ');
var defaultUnicornName = sillyName[0];

// Material Design Color Palette
var materialColors = require('./color-palette.js');
var colorPalette = materialColors.getPalette();

// Push color palette keys to global colorOptions array
var colorOptions = _.keys(colorPalette);
 
var UnicornGenerator = yeoman.generators.Base.extend({
  promptUser: function() {

    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + 'Unicorn'.rainbow + ' generator. Giddyup!'
    ));

    // Prepare our questions
    var prompts = [{
      type: 'input',
      name: 'unicornName',
      message: 'What is the name of your unicorn?',
      default: defaultUnicornName
    },{
      type: 'list',
      name: 'primaryColor',
      message: '\n\nPaint your unicorn!\n\nWhat color is your unicorn? Choose primary, accent and warn.\n\nPrimary Color:',
      choices: colorOptions,
      default: colorOptions[Math.floor(Math.random()*colorOptions.length)]
    },{
      type: 'list',
      name: 'accentColor',
      message: 'Accent Color:',
      choices: colorOptions,
      default: colorOptions[Math.floor(Math.random()*colorOptions.length)]
    },{
      type: 'list',
      name: 'warnColor',
      message: 'Warn Color:',
      choices: colorOptions,
      default: 'red'
    },
    {
      type: 'list',
      name: 'bgColor',
      message: 'Background Color:',
      choices: colorOptions,
      default: 'grey'
    }];

    // Prompt the user with our questions
    this.prompt(prompts, function (answers) {

      // Get the baby unicorn's name
      this.unicornName = answers.unicornName;

      // And its colors
      this.colors = {
        primary: {
          name: answers.primaryColor,
          palette: colorPalette[answers.primaryColor]
        },
        accent: {
          name: answers.accentColor,
          palette: colorPalette[answers.accentColor]
        },
        warn: {
          name: answers.warnColor,
          palette: colorPalette[answers.warnColor]
        },
        background: {
          name: answers.bgColor,
          palette: colorPalette[answers.bgColor]
        }
      };

      done();
    }.bind(this));
  },

  /**
   * Write files to disk
   */
  write: function() { 

    // Copy some config files without template processing
    this.copy('.bowerrc', '.bowerrc');
    this.copy('.editorconfig', '.editorconfig');
    this.copy('.gitignore', '.gitignore');
    this.copy('.sailsrc', '.sailsrc');
    this.copy('app.js', 'app.js');
    this.copy('Gruntfile.js', 'Gruntfile.js');

    // Prepare the template context for yeoman
    var context = {
      unicorn: {
        name: this.unicornName,
        color: this.colors
      }
    };

    // Process some config files as templates
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      context
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      context
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      context
    );
    
    // Set lowercase module name based on unicorn's name
    context.unicorn.module = this.unicornName.toLowerCase();

    this.fs.copyTpl(
      this.templatePath('views/layout.ejs'),
      this.destinationPath('views/layout.ejs'),
      context
    );

    // Process Sails API folder as template
    this.fs.copyTpl(
      this.templatePath('api/'),
      this.destinationPath('api/'),
      context
    );

    // Process Sails config folder as template
    this.fs.copyTpl(
      this.templatePath('config/'),
      this.destinationPath('config/'),
      context
    );

    // Process grunt tasks folder as template
    this.fs.copyTpl(
      this.templatePath('tasks/'),
      this.destinationPath('tasks/'),
      context
    );

    // Process Sails/EJS views folder as template
    this.fs.copyTpl(
      this.templatePath('views/'),
      this.destinationPath('views/'),
      context
    );

    // Process assets folder as template

    this.fs.copyTpl(
      this.templatePath('assets/js/'),
      this.destinationPath('assets/js/'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('assets/styles/'),
      this.destinationPath('assets/styles/'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('assets/templates/'),
      this.destinationPath('assets/templates/'),
      context
    );

    this.fs.copyTpl(
      this.templatePath('assets/App.js'),
      this.destinationPath('assets/App.js'),
      context
    );

    // Copy some assets without templating
    this.fs.copy(
      this.templatePath('assets/robots.txt'),
      this.destinationPath('assets/robots.txt')
    );

    this.fs.copy(
      this.templatePath('assets/images/'),
      this.destinationPath('assets/images/')
    );

    this.fs.copy(
      this.templatePath('assets/fonts/'),
      this.destinationPath('assets/fonts/')
    );
  },

  /**
   * Install server-side dependencies
   */
  install: function () {
    this.log("\n\n\n\nHurrah! " + this.unicornName.rainbow + " is off to the races! Hold tight, this next part can take several minutes.\n\n");
    this.installDependencies();
  }

});
 
module.exports = UnicornGenerator;