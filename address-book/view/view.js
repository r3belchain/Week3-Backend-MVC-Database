const chalk = require("chalk");


const success = chalk.bold.red;
const error = chalk.bold.red;
const info = chalk.blue;
const warn = chalk.yellow;


class View {

  static showSuccess(message) {
    console.log(success("✅ " + message));
  }

 
  static showError(message) {
    console.log(error("❌ " + message));
  }

 
  static showInfo(message) {
    console.log(info("ℹ️ " + message));
  }

 
  static showWarning(message) {
    console.log(warn("⚠️ " + message));
  }

  static showTable(data, title = "Data") {
    console.log(chalk.magentaBright.bold(`\n=== ${title} ===`));
    console.table(data);
  }

  static async showLoading(message = "Loading...", duration = 1000) {
    process.stdout.write(chalk.cyan(message));
    const interval = setInterval(() => process.stdout.write("."), 200);
    await new Promise((resolve) => setTimeout(resolve, duration));
    clearInterval(interval);
    console.log(success(" Done!\n"));
  }
}

module.exports = View;
