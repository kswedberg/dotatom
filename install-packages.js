var fs = require('fs');
var path = require('path');
var pkgDir = path.join(process.cwd(), 'packages');
var exec = require('child_process').exec;
fs.readdir(pkgDir, function(err, files) {
  if (err) {
    return console.log(err);
  }

  var apmInstall = function apmInstall(index) {
    var file = files[index];
    var dir;

    if (!file) {
      console.log('Finished reading through', pkgDir);

      return;
    }

    dir = path.join(pkgDir, file);
    index++;

    fs.stat(dir, function(err, stats) {
      if (err) {
        console.log(err);

        return apmInstall(index);
      }

      if (!stats.isDirectory()) {
        return apmInstall(index);
      }

      fs.stat(path.join(dir, 'package.json'), function(err, fStats) {
        if (err) {
          console.log('Skipping', file, '. No package.json');

          return apmInstall(index);
        }

        if (!fStats.isFile()) {
          return apmInstall(index);
        }

        exec('apm install', {
          cwd: dir
        }, function(err, stdout) {
          if (err) {
            console.log(err);

            return apmInstall(index);
          }

          console.log('Running apm install for', file);
          console.log(stdout);

          if (index < files.length) {
            apmInstall(index);
          } else {
            console.log('Last Directory:', file);
          }
        });
      });
    });
  };

  apmInstall(0);
});
