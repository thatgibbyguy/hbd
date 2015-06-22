// wrapper function
module.exports = function(grunt){
	// load all our Grunt plugins
	require('load-grunt-tasks')(grunt);
	var jpegRecompress = require('imagemin-jpeg-recompress');
	
	grunt.loadNpmTasks('grunt-ftpush');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-git');
	grunt.loadNpmTasks('grunt-deployments');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-criticalcss');

	grunt.initConfig({
	pkg:grunt.file.readJSON('package.json'),
		// task configuration goes here

		jshint:{
			options:{
				'node':true,
				'esnext':true,
				'curly':false,
				'smarttabs':false,
				'indent':2,
				'quotmark':'single'
			},
			all:['Gruntfile.js','app/js/script.js']
		},

		ftpush:{
			build:{
				auth:{
					host:'',
					port:21,
					authKey:'key1' // found in .ftppass
				},
				// ============= Change "projectdirectory"
				// src:'/Applications/AMPPS/www/projectdirectory/',
				// dest:'/projectdirectory.com/',
				exclusions:['*/.DS_Store','.DS_Store','Archive.zip','.git','Gruntfile.js','node_modules','*.sql'],
				simple:true,
				useList:true
			}
		},

		less:{
			production: {
				options:{
					paths:['app/css'],
					report:'gzip'
				},
				files:{
					'app/css/styles.css':'app/css/styles.less'
				}
			}
		},

		cssmin: {
			add_banner: {
				options: {
				banner: '/* Author: John Gibby @thatgibbyguy || Quinton Jason @quintonjasonjr || for @Xdesigninc #teamXdesign */'
			},
				files: {
				'app/css/styles.css': ['app/css/styles.css']
				}
			}
		},

		imagemin:{
			dynamic:{
				files:[{
					expand:true,
					cwd: 'app/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'app/'
				}]
			}
		},

		uglify: {
			my_target: {
				options: {
					mangle:false,
					report:'gzip'
				},
				files: {
					'app/js/script.min.js': ['app/js/script.js']
				}
			}
		},

		watch: {
			scripts:{
				files:'app/js/script.js',
				tasks:['uglify'],
				options:{
					livereload:true
				}
			},
			css:{
				files:'app/css/styles.less',
				tasks:['less'],
				options:{
					livereload:true
				}
			},
			commit:{
				files:['.git/logs/HEAD'],
				tasks:['imagemin']
			}
		}

	});

    // define the default task that executes when we run 'grunt' from inside the project
	grunt.registerTask('default', ['watch']);

};