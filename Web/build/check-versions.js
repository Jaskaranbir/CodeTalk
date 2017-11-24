const chalk = require('chalk')
const childProcess = require('child_process')
const packageConfig = require('../package.json')
const semver = require('semver')

function exec(cmd) {
  return childProcess.execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  }
]

module.exports = function () {
  const warnings = []
  versionRequirements.forEach(mod => {
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(`${mod.name}: ` +
        `${chalk.red(mod.currentVersion)} should be ` +
        chalk.green(mod.versionRequirement)
      )
    }
  })

  if (warnings.length) {
    console.log()
    console.log(chalk.yellow('To use this configuration, you must update following to modules:'))
    console.log()
    warnings.forEach(warning => {
      console.log(`  ${warning}`)
    })
    console.log()
    process.exit(1)
  }
}
