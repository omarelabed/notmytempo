"use strict";

var peopleApp = new Vue({
    el: '#members',
    data() {
        return {
            active: '',
            people: [],
            allPeople: [],
            filter: null,
            filterValue: ''
        }
    },
    beforeCreate() {
        let self = this;
        axios
        .get('http://notmytempo.xyz/data/people.json')
        .then(response => {
            self.people = response.data;
            self.allPeople = response.data;
        })
    },
    created(){
        this.allPeople = this.people.slice();
    },
    methods: {
        filterPeople: function(filter) {
            if (this.$refs && this.$refs.resetPeople && this.$refs.resetPeople.focus) {
                this.$refs.resetPeople.focus();
            }
            // this.$refs['#resetPeople'].focus();
            this.filter = filter;
            if (!filter) {
                return this.people;
            } else {
                var peeps = [];
                if (filter === 'NMT') {
                    // filter NMT
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
                    // filter for focus
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
