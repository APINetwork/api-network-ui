module.exports = function(grunt) {

  grunt.initConfig({

    path: {
      // Source folders
      less: 'less',
      js: 'js',

      // Output folders (transient)
      dist: 'dist',
      dist_css: 'dist/css',
      dist_js: 'dist/js',
      dist_vendor: 'dist/vendor'
    },

    clean: {
      dist: ['<%- path.dist %>']
    },

    less: {
      options: {
        paths: [
          '<%- path.dist_vendor %>'
        ],
        sourceMap: true,
        sourceMapFilename: '<%- path.dist_css %>/engine-ui.css.map',
        sourceMapBasepath: '<%- path.dist_css %>'
      },

      dist: {
        files: {
          '<%- path.dist_css %>/engine-ui.css': '<%- path.less %>/engine-ui.less'
        }
      }
    },

    bower: {
      install: {
        options: {
          targetDir: '<%- path.dist_vendor %>',
          verbose: true,
          layout: 'byComponent',
          bowerOptions: {
            production: true
          }
        }
      }
    },

    concat: {
      dist: {
        src: [
          '<%- path.dist_vendor %>/bootstrap/bootstrap.js',
          '<%- path.js %>/engine-ui.js'
        ],
        dest: '<%- path.dist_js %>/engine-ui.js',
      },
    },

    shell: {
      options: {
        stdout: true,
        stderr: true,
        failOnError: true
      },

      sourcemap_links: {
        command: [
          'cd dist/css',
          'rm -f dist && ln -s ../ dist',
          'rm -f less && ln -s ../../less less'
        ].join('&&')
      }
    },

    watch: {
      options: {
        nospawn: true
      },

      less: {
        files: ['<%- path.less %>/**/*'],
        tasks: ['less:engineui']
      },

      // Start livereload server at http://localhost:35729/livereload.js
      livereload: {
        options: {
          cwd: '<%- path.dist %>',
          livereload: true
        },

        files: [
          '**/*'
        ]
      }
    }
  });

  // bring in all grunt plugins from package.json
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dist-dev', [
    'bower',
    'less',
    'concat',
    'shell'
  ]);

  grunt.registerTask('default', ['dist-dev']);
};
