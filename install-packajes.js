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
    var dir = path.join(pkgDir, file);

    if (!file) {
      console.log('Finished reading through', pkgDir);

      return;
    }

    index++;

    fs.stat(dir, function(err, stats) {
      if (err) {
        return console.log(err);
      }

      if (stats.isDirectory()) {
        console.log('Directory:', dir);
        exec('apm install', {
          cwd: dir
        }, function(err, stdout) {
          if (err) {
            return console.log(err);
          }

          console.log(stdout);

          if (index < files.length) {
            apmInstall(index);
          } else {
            console.log('Last Directory:', file);
          }
        });
      } else {
        apmInstall(index);
      }
    });

  };

  apmInstall(0);
});
