 class Filterable{
    constructor(data){
        this.data = data;
    }
    filters=new Set();
    addFilter(filter){
        this.filters.add(filter);
    }

    run(){
        return this.data.filter(p => [...this.filters].every(filter => filter(p)));
    }

    removeFilter(filter){
        this.filters.delete(filter);
    }

    clearFilters(){
        this.filters = new Set();
    }

    
 };

 class Map{
    constructor(iterable, mapFunction){
        this.mapFunction = mapFunction;
        this.iterable = iterable;
    }
    *[Symbol.iterator](){
        for(let item of this.iterable){
            yield this.mapFunction(item);
        }

    }
 }

 

 let persons = [
    {
        age: 27,
        name: "Susana"
    },
    {
        age: 29,
        name: "Kack"
    },
    {
        age: 30,
        name: "Pepe"
    }

 ];
 let list = new Filterable(persons);
 list.addFilter(p => p.age > 28);
 console.log(list.run());
 let kack = p => p.name == "Kack";
 list.addFilter(kack);
 console.log(list.run());
 list.removeFilter(kack);
 console.log(list.run());
 list.clearFilters();
 console.log(list.run());

