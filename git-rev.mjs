// Inspired by:
// https://stackoverflow.com/questions/42155115/how-to-include-git-revision-into-angular-cli-application
import gitDescribe from 'git-describe';
import { relative, resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';

const { gitDescribeSync } = gitDescribe;

const packageVersion = JSON.parse(readFileSync(resolve(import.meta.dirname, 'package.json'), 'utf-8')).version;

const gitInfo = gitDescribeSync(import.meta.dirname, { dirtyMark: '', dirtySemver: false });

const version = {
  ...gitInfo,
  version: packageVersion,
}

if (!existsSync(resolve(import.meta.dirname, 'src', 'shared-ng', 'environments'))) {
  mkdirSync(resolve(import.meta.dirname, 'src', 'shared-ng', 'environments'));
}
const file = resolve(import.meta.dirname, 'src', 'shared-ng', 'environments', 'version.ts');
writeFileSync(file,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* eslint-disable */
export const VERSION = ${JSON.stringify(version, null, 4)};
`, { encoding: 'utf-8' });

console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(import.meta.dirname, '..'), file)}`);
