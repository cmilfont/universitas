var sys = require('sys')
var exec = require('child_process').exec;
var child;

var cmd = "/Users/cmilfont/projetos/mongodb-osx-x86_64-1.8.1/bin/mongod --rest";

child = exec(cmd, function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});

child.on('exit', function (code, signal) {
  console.log('child process terminated due to receipt of signal ' + signal);
});

console.log('child pid: ' + child.pid);

child.kill();
