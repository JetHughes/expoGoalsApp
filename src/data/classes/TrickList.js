class TrickList {
  constructor(tricks, type, name, id){
    this.tricks = tricks;
    this.type = type;
    this.name = name;
    this.id = id ? id: Date.now() + ( (Math.random()*100000).toFixed());
  }
}

export default TrickList;