// devDir string is the development directory
module.exports = async function(devDir) {
  const fs = require('fs');
  const path = require('path');
  const spawnAwait = require('await-spawn'); // use await with a child process

  const log = console.log;
  const er = console.error;

  async function gitPull(proj) {
    log(proj);
    await spawnAwait('git', [
      '-C', proj,
      'pull'
    ], {
      stdio: 'inherit'
    });
  }

  async function syncDev() {
    let folders = fs.readdirSync(devDir);
    for (let i = 0; i < folders.length; i++) {
      if (fs.statSync(folders[i]).isDirectory()) {
        log(folders[i]);
        let projects = fs.readdirSync(folders[i]);
        for (let j = 0; j < projects.length; j++) {
          let proj = folders[i] + '/' + projects[j];
          if (fs.statSync(proj).isDirectory()) {
            try {
              await gitPull(proj);
            } catch (ror) {
              er('failed to git pull');
            }
          }
        }
      }
    }
  }

  await syncDev();
};
