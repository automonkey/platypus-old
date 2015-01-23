var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('deploy', function(cb) {
  exec('heroku push --app platypus-lives', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
