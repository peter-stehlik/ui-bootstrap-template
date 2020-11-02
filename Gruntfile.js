module.exports = function (grunt) {
	// Force use of Unix newlines
	grunt.util.linefeed = "\n";
  
	grunt.initConfig({
	  pkg: grunt.file.readJSON("package.json"),
  
	  sass: {
		dist: {
		  options: {
			style: "expanded"
		  },
		  files: {
			"assets/dist/css/bootstrap.5.0.0.css": "assets/dev/scss/bootstrap/bootstrap.scss",
			"assets/dist/css/custom.css": "assets/dev/scss/custom/main.scss",
			"assets/dist/css/dashboard-template.css": "assets/dev/scss/custom/dashboard-template.scss",
			"assets/dist/css/preview-copy-wrap.css": "assets/dev/scss/custom/preview-copy-wrap.scss"
		  }
		}
	  },
  
	  postcss: {
		options: {
		  map: false, // inline sourcemaps
  
		  processors: [
			require("autoprefixer")(), // add vendor prefixes
			require("cssnano")() // minify the result
		  ]
		},
		dist: {
		  src: "assets/dist/css/custom.css",
		  dest: 'assets/dist/css/custom.min.css'
		}
	  },
  
	  imagemin: {
		// Task
		dynamic: {
		  // Another target
		  files: [
			{
			  expand: true, // Enable dynamic expansion
			  cwd: "images/raw/", // Src matches are relative to this path
			  src: ["*.{png,jpg,gif}"], // Actual patterns to match
			  dest: "images/" // Destination path prefix
			}
		  ]
		}
	  },
  
	  watch: {
		scripts: {
		  files: ["assets/dev/scss/**/*.scss", "assets/dev/es6/**/*.js"],
		  tasks: ["sass", "babel", "eslint:build"],
		  options: {
			interrupt: true,
			spawn: false
		  }
		}
	  },
  
	  concat: {
		dev: {
		  src: [
			'assets/dist/js/bootstrap.bundle.min.js',
			'assets/dist/js/custom.js'
		  ],
		  dest: 'assets/dist/js/main.js'
		}
	  },
  
	  eslint: {
		build: {
		  options: {
			configFile: 'assets/dev/es6/eslint.json'
		  },
		  src: ['assets/dist/js/custom.js']
		},
	  },
  
	  babel: {
		options: {
		  sourceMap: false,
		  presets: ['@babel/preset-env']
		},
		dist: {
		  files: {
			"assets/dist/js/custom.js": "assets/dev/es6/custom.js",
			"assets/dist/js/preview-copy-wrap.js": "assets/dev/es6/preview-copy-wrap.js",
			"assets/dist/js/dashboard-template.js": "assets/dev/es6/dashboard-template.js"
		  }
		}
	  },
  
	  uglify: {
		main: {
		  files: {
			"assets/dist/js/custom.min.js": "assets/dist/js/custom.js"
		  }
		}
	  },
  
	  htmllint: {
		all: ["*.html"]
	  }
	  
	});
  
	grunt.registerTask("dev", ["sass", "babel", "eslint:build", "htmllint"]);
	grunt.registerTask("build", ["sass", "babel", "eslint:build", "postcss", "imagemin", "htmllint", "uglify"]);
  
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-postcss");
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-babel");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-html");
  };
  