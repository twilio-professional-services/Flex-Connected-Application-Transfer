class ConnectedApp {
  constructor(name, applicationSid, transferTargetType, transferTarget) {
    this._name = name;
    this._applicationSid = applicationSid;
    this._transferTargetType = transferTargetType;
    this._transferTarget = transferTarget;
  }

  get getName() {
    return this._name;
  }
  get getApplicationSid() {
    return this._applicationSid;
  }

  get getTransferTargetType() {
    return this._transferTargetType;
  }

  get getTransferTarget() {
    return this._transferTarget;
  }
}

export default ConnectedApp;
