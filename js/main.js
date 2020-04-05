"use strict";
console.log("main.js");

var peopleApp = new Vue({
    el: '#people',
    data: {
        active: '',
        people: [
            {
                name: "Giacomo Bastianelli",
                focus: "Graphic Design",
                url: "https://www.instagram.com/giacomo.bastianelli/",
                role: "Creative Director"
            }, {
                name:"Under Changeover",
                focus:"Music",
                url:"https://www.instagram.com/underchangeover/"
            }, {
                name:"Tam Bor",
                focus:"Music",
                url:"https://www.instagram.com/tambor___/"
            }, {
                name:"Tatum Rush",
                focus:"Music",
                url:"https://www.instagram.com/tatumrush/"
            }
        ],
        allPeople: [],
        filter: null,
        filterValue: ''
    },
    created: function(){
        this.allPeople = this.people.slice();
    },
    methods: {
        filterPeople: function(filter) {
            this.filter = filter;
            if (!filter) {
                return this.people;
            } else {
                var peeps = [];
                if (filter === 'NMT') {
                    this.filterValue = 'NMT';
                    for (let p of this.people) {
                        if (p.role && p.role.length) {
                            p.fade = false;
                            peeps.unshift(p);
                        } else {
                            p.fade = true;
                            peeps.push(p);
                        }
                    }
                } else if (filter.focus) {
                    this.filterValue = filter.focus;
                    for (let p of this.people) {
                        if (p.focus === filter.focus) {
                            p.fade = false;
                            peeps.unshift(p);
                        } else {
                            p.fade = true;
                            peeps.push(p);
                        }
                    }
                }
            }
            this.people = peeps;
            return peeps;
        },
        reset: function() {
            this.people = this.allPeople;
            this.people.forEach((item, i) => {
                item.fade = false;
            });
            this.filter = null;
        }
    }
});
