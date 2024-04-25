import demoConfig from '../demoConfig.json';

class AppController {
  config: any;
  controls: any;
  commands: any;
  constructor() {
    this._loadConfig();
    this.commands = {};
  }

  registerCommand(commandName: string, callback: Function) {
    this.commands[commandName] = {
      callback: callback
    };
  }

  _loadConfig() {
    //TODO: Load config from server
    this.config = demoConfig;
  }

  _createControls() {
    const controls = this.config.controls;
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];
    }
  }
}

export default AppController;
