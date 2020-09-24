class Goal {
  constructor(type, period, name, id) {
    this.type = type;
    this.period = period;
    this.name = name;
    this.id = id ? id: Date.now() + ( (Math.random()*100000).toFixed());
  }
}

  export default Goal;