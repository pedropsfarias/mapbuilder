import demoConfig from '../demoConfig.json';

class AppController {
  config: any;
  controls: any;
  commands: any;
  toolbars: any;
  constructor() {
    this._loadConfig();
    this.commands = {};
    this.controls = {};
    this.toolbars = {};

    setTimeout(() => {
      this._createControls();
    }, 100);
  }

  registerToolbar(toolbarName: any, toolbar: any) {
    this.toolbars[toolbarName] = toolbar;
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
    console.log('Creating controls...'); // "Creating controls...
    const controls = this.config.controls;
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];

      const toolbar = control.toolbar || 'left';
      const toolbarRef = this.toolbars[toolbar];

      console.log('Adding control', control.name, 'to toolbar', toolbar); // "Adding control bold to toolbar left"

      if (toolbarRef) {
        const controlRef = toolbarRef.addControl(control);
        this.controls[control.name] = controlRef;
      }
    }
  }
}

export default AppController;
