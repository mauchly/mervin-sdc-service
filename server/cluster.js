var cluster = require('cluster');

if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;
  console.log(cpuCount)
  // Create a worker for each CPU
  for (var i = 0; i < cpuCount/4; i += 1) {
    cluster.fork();
  }
  // Listen for dying workers
  cluster.on('exit', function () {
    cluster.fork();
  });
} else {
  require('./index.js');
}