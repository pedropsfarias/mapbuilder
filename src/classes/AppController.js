import demoConfig from '../demoConfig.json'
import mitt from 'mitt'
import appStatusStore from '@/stores/appStatusStore.js'
// import Measure from '@/classes/map/Measure.js'

class AppController {
  constructor() {
    this._loadConfig()
    this.commands = {}
    this.controls = {}
    this.toolbars = {}
    this.docks = {}

    this.statusStore = appStatusStore()

    this.statusStore.$subscribe((mutation, state) => {
      console.log('App status changed:', state) // "App status changed: { _mapIsDone: true, _layoutIsDone: true }"
      if (state._mapIsDone && state._layoutIsDone) {
        this._createControls()
      }
    })

    const emitter = mitt()
    this.emitter = emitter
  }

  get map() {
    return this._map
  }

  set map(value) {
    this._map = value
  }

  registerToolbar(toolbarName, toolbar) {
    this.toolbars[toolbarName] = toolbar
  }

  registerDock(dockName, dock) {
    this.docks[dockName] = dock
  }

  registerCommand(commandName, run, undo) {
    this.commands[commandName] = {
      run: run,
      undo: undo
    }

    console.log('Command registered:', commandName)
  }

  run(commandName, payload) {
    console.log('Running command:', commandName) // "Running command: bold"
    const command = this.commands[commandName]
    if (command) {
      command.run(payload)
    } else {
      console.error('Command not found:', commandName)
    }
  }

  getDock(name) {
    return this.docks[name]
  }

  _loadConfig() {
    //TODO: Load config from server
    this.config = demoConfig
  }

  _createControls() {
    console.log('Creating controls...') // "Creating controls...
    const controls = this.config.controls
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i]

      const toolbar = control.toolbar || 'left'
      const toolbarRef = this.toolbars[toolbar]

      console.log('Adding control', control.name, 'to toolbar', toolbar) // "Adding control bold to toolbar left"

      if (toolbarRef) {
        const controlRef = toolbarRef.addControl(control)
        this.controls[control.name] = controlRef
      }
    }
  }
}

export default AppController
