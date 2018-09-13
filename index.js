module.exports = async function(opt) {
	const fs = require('fs');
	const path = require('path');
	const spawnAwait = require('await-spawn'); // use await with a child process

	const log = console.log;
	const err = console.error;

	async function gitPull(proj) {
		log(proj);
		if (opt.f || opt.force) {
			await spawnAwait('git', [
				'stash'
			], {
				stdio: 'inherit',
				cwd: proj
			});
		}
		try {
			await spawnAwait('git', [
				'pull'
			], {
				stdio: 'inherit',
				cwd: proj
			});
		} catch (ror) {
			log('failed to git pull, use -f or --force to stash then pull');
		}
	}

	async function npmV(proj) {
		log(proj);
		await spawnAwait('npm', [
			'version', 'patch', '--force'
		], {
			stdio: 'inherit',
			cwd: proj
		});
	}

	async function syncProj(proj) {
		if (fs.statSync(proj).isDirectory()) {
			await gitPull(proj);
		}
	}

	async function syncDev(dir) {
		dir = path.resolve(dir);
		log(dir);
		let stats = fs.statSync(dir);
		let bo = stats.isDirectory();
		if (!bo) {
			log('input must be a dev directory or array of multiple projects');
			return;
		}
		let folders = fs.readdirSync(dir);
		for (let i = 0; i < folders.length; i++) {
			let stats = fs.statSync(folders[i])
			if (!stats.isDirectory(folders[i])) {
				continue;
			}
			log(folders[i]);
			let projects = fs.readdirSync(folders[i]);
			for (let j = 0; j < projects.length; j++) {
				let proj = folders[i] + '/' + projects[j];
				await syncProj(proj);
			}
		}
	}

	log(opt._);

	if (!opt._ || opt._.length <= 1) {
		await syncDev(((opt._.length == 1) ? opt._[0] : ((opt.i) ? opt.i : '.')));
	} else {
		for (let i = 0; i < opt._; i++) {
			await syncProj(opt._);
		}
	}
};
