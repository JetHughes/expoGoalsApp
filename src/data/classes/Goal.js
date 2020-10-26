import Utils from '../../Utils';

class Goal {
  constructor(type, period, name, id) {
    this.type = type;
    this.period = period;
    this.name = name;
    this.id = id ? id: Utils.unique();
    this.isComplete = false;
  }
}

  export default Goal;