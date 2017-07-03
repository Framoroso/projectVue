// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import App from './App';
// import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data() {
        return {
            on: true,
            uneAutreVar: 'Bibi',
            message: 'Hello vue.js',
            maList: [
                {
                    name: 'Bibi',
                    color: '#FF00FF'
                },
                {
                    name: 'Moulin',
                    color: '#00FF00'
                },
                {
                    name: 'Babe',
                    color: '#0000FF'
                }
            ]
        };
    },
    filters: {
        toAvatars(person) {
            return `https://robohash.org/${person.name}`;
        }

    },
    methods: {
        addToList() {
            const person = {
                name: this.uneAutreVar,
                color: this.color
            };
            this.maList.push(person);
        },
        remove(person) {
            let index = this.maList.indexOf(person);
            this.maList.splice(index, 1);
        }
    }
    // router,
    // template: '<App/>',
    // components: { App }
});
