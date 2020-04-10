"use strict";

var peopleApp = new Vue({
    el: '#members',
    data() {
        return {
            members: [],
        }
    },
    beforeCreate() {
        let self = this;
        axios
        .get('/data/people.json')
        .then(response => {
            self.members = response.data;
        })
    },
    created(){
    },
    mounted() {
        window.scrollTo(0, 0);
        window.addEventListener("scroll", this.lazyLoad);
    },
    methods: {
        lazyLoad: function () {
            let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
            let active = false;
            let self = this;
            if (active === false) {
                active = true;
                setTimeout(() => {
                    lazyImages.forEach(function (lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");
                            lazyImages = lazyImages.filter(function (image) {
                                return image !== lazyImage;
                            });

                            if (lazyImages.length === 0) {
                                window.removeEventListener("scroll", self.lazyLoad);
                            }
                        }
                    });
                    active = false;
                }, 200)
            }
        }
    }
});
