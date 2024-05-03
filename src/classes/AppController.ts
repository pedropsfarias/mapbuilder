import demoConfig from '../demoConfig.json';
import mitt from 'mitt';
import appStatusStore from '@/stores/appStatusStore';
import Measure from '@/classes/map/Measure';

class AppController {
  private _map: any;
  config: any;
  controls: any;
  commands: any;
  toolbars: any;
  emitter: any;
  docks: any;
  statusStore: any = appStatusStore();

  constructor() {
    this._loadConfig();
    this.commands = {};
    this.controls = {};
    this.toolbars = {};
    this.docks = {};

    this.statusStore.$subscribe((mutation: any, state: any) => {
      console.log('App status changed:', state); // "App status changed: { _mapIsDone: true, _layoutIsDone: true }"
      if (state._mapIsDone && state._layoutIsDone) {
        this._createControls();
      }
    });

    const emitter = mitt();
    this.emitter = emitter;
  }

  public get map(): any {
    return this._map;
  }

  public set map(value: any) {
    this._map = value;
  }

  registerToolbar(toolbarName: any, toolbar: any) {
    this.toolbars[toolbarName] = toolbar;
  }

  registerDock(dockName: string, dock: any) {
    this.docks[dockName] = dock;
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
    return this.docks[name];
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
