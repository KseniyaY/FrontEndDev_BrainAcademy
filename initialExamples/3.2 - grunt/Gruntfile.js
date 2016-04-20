module.exports = function(grunt) {
    
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
        main: 
        {
          files: {
              "static/css/main.css": "data/less/main.less"
          }
        }        
    },
    copy: {
      bootstrap: {
        files: [
          {expand: true, cwd: 'node_modules/bootstrap/dist/', src: ['**/*.min.*'], dest: 'static/', filter: 'isFile'}
        ]
      }
    },
    clean: {
      bootstrap: ['static/**/bootstrap*'],
      css: ['static/css/*.css']
    },
    includeSource: {
        options: {
          basePath: 'static/',
          baseUrl: './'
        },
        myTarget: {
          files: {
            'static/index.html': 'static/html/index.html'
          }
        }
    }

  });

  // grunt.loadNpmTasks('grunt-npm-install'); 
  grunt.loadNpmTasks('grunt-contrib-less');  
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'copy:bootstrap', 'less', "includeSource"]);
};
