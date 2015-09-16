module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
  	'clean': ['generators/app/templates/'],
    'shell': {
      gitclone: {
        command: 'git clone https://github.com/lukeheath/unicorn.git generators/app/templates/'
      }
    },
    'string-replace': {
    	prepConfig: {
    		files: {
    			'generators/app/templates/config/': 'generators/app/templates/config/**'
    		},
    		options: {
    			replacements: [
    				{
    					pattern: /<%/,
    					replacement: '<%%'
    				}
    			]
    		}
    	},
        build: {
        	files: {
        		'generators/app/templates/assets/js/': 'generators/app/templates/assets/js/**',
        		'generators/app/templates/assets/styles/': 'generators/app/templates/assets/styles/**',
        		'generators/app/templates/assets/templates/': 'generators/app/templates/assets/templates/**',
        		'generators/app/templates/assets/App.js': 'generators/app/templates/assets/App.js',
        		'generators/app/templates/views/': 'generators/app/templates/views/**',
        		'generators/app/templates/package.json': 'generators/app/templates/package.json',
        		'generators/app/templates/bower.json': 'generators/app/templates/bower.json',
        		'generators/app/templates/README.md': 'generators/app/templates/README.md'
        	},	
            options: {
                replacements: [
                	{
                		pattern: /(<%-)/g,
                		replacement: '<%%-'
                	},
                	{
                        pattern: /unicorn/g,
                        replacement: '<%=unicorn.module ENDTAG'
            	    },
                	{
                        pattern: /Unicorn/g,
                        replacement: '<%=unicorn.name ENDTAG'
            	    }, 
            	    {
                        pattern: /ENDTAG/g,
                        replacement: '%>'
                    }
                ]
            }
        },
        setColorOptionsName: {
            files: {
            	'generators/app/templates/assets/js/unicorn.module.js': 'generators/app/templates/assets/js/unicorn.module.js'
            },
            options: {
            	replacements: [
            		{
            			pattern: /deep-purple/,
            			replacement: '<%=unicorn.color.primary.name ENDTAG'
            		},
            		{
            			pattern: /pink/,
            			replacement: '<%=unicorn.color.accent.name ENDTAG'
            		},
            		{
            			pattern: /red/,
            			replacement: '<%=unicorn.color.warn.name ENDTAG'
            		},
            		{
            			pattern: /grey/,
            			replacement: '<%=unicorn.color.background.name ENDTAG'
            		},
            		{
                        pattern: /ENDTAG/g,
                        replacement: '%>'
                    }
            	]
            }
    	},
        setColorOptionsHex: {
            files: {
                'generators/app/templates/assets/js/controllers/AppCtrl.js': 'generators/app/templates/assets/js/controllers/AppCtrl.js'
            },
            options: {
                replacements: [
                    {
                        pattern: '#673AB7',
                        replacement: '<%=unicorn.color.primary.palette[500] ENDTAG'
                    },
                    {
                        pattern: '#EC407A',
                        replacement: '<%=unicorn.color.accent.palette[400] ENDTAG'
                    },
                    {
                        pattern: /ENDTAG/g,
                        replacement: '%>'
                    }
                ]
            }
        }
    },
	'copy': {
    	styles: {
    		files: [
				{
					src: ['generators/app/templates/generator/colors.template.less'],
					dest: 'generators/app/templates/assets/styles/styleguide/colors.less'
				}
    		]
    	},
        gruntfile: {
            files: [
                {
                    src: ['generators/app/templates/.gitignore'],
                    dest: 'generators/app/templates/gitignore'
                }
            ]
        }
    },
  });

grunt.registerTask('default', ['clean', 'shell', 'string-replace', 'copy']);

};