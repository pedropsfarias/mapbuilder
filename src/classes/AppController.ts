import demoConfig from '../demoConfig.json';
import mitt from 'mitt';

class AppController {
  config: any;
  controls: any;
  commands: any;
  toolbars: any;
  emitter: any;

  constructor() {
    this._loadConfig();
    this.commands = {};
    this.controls = {};
    this.toolbars = {};

    setTimeout(() => {
      this._createControls();
    }, 10);

    const emitter = mitt();
    this.emitter = emitter;
  }

  registerToolbar(toolbarName: any, toolbar: any) {
    this.toolbars[toolbarName] = toolbar;
  }

  registerCommand(commandName: string, run: Function, undo: Function) {
    this.commands[commandName] = {
      run: run,
      undo: undo
    };

    console.log('Command registered:', commandName);
  }

  run(commandName: string, payload: any) {
    console.log('Running command:', commandName); // "Running command: bold"
    const command = this.commands[commandName];
    if (command) {
      command.run(payload);
    } else {
      console.error('Command not found:', commandName);
    }
  }

  getDock(name: string) {
    return this.d;
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
